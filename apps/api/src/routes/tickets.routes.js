const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Event = require('../models/Event.model')
const Ticket = require('../models/Ticket.model')
const Transaction = require('../models/Transaction.model')
const PricingService = require('../services/pricing.service')
const { authenticate, authorize } = require('../middleware/authenticate')

const JWT_SECRET = process.env.JWT_SECRET || 'passwale_jwt_super_secret_key_123'

// POST /api/tickets/purchase - Initiate ticket purchase
router.post('/purchase', authenticate, async (req, res, next) => {
  try {
    const { eventId, categoryId, quantity = 1, attendeeNames = [] } = req.body

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const category = event.ticketCategories.id(categoryId)
    if (!category) {
      return res.status(404).json({ success: false, error: { code: 'CATEGORY_NOT_FOUND', message: 'Ticket category not found' } })
    }

    // Check availability
    const available = category.quantity - category.sold
    if (available < quantity) {
      return res.status(400).json({ success: false, error: { code: 'TICKET_SOLD_OUT', message: 'Not enough tickets remaining' } })
    }

    // Calculate price
    const pricing = await PricingService.calculateTicketPrice({
      basePrice: category.price,
      category,
      userId: req.user._id,
      organizerId: event.organizer,
      quantity
    })

    const orderId = `order_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`

    // Create tickets stub (will activate on payment success)
    const ticketStubs = []
    for (let i = 0; i < quantity; i++) {
      const ticketNumber = `PW-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
      const qrSecret = crypto.randomBytes(16).toString('hex')

      const holderName = attendeeNames[i] || req.user.name || 'Attendee'

      const ticket = new Ticket({
        ticketNumber,
        eventId: event._id,
        userId: req.user._id,
        categoryId: category._id,
        qrSecret,
        holderName,
        status: 'active'
      })

      // In real S3 upload, QR is created & uploaded.
      // We'll set a mock QR URL pointing to a generator API or stub.
      ticket.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=passwale://ticket/${ticketNumber}`
      ticketStubs.push(ticket)
    }

    // Save tickets
    const savedTickets = await Promise.all(ticketStubs.map(t => t.save()))

    // Create transaction
    const transaction = new Transaction({
      userId: req.user._id,
      eventId: event._id,
      tickets: savedTickets.map(t => ({
        ticketId: t._id,
        categoryId: category._id,
        basePrice: category.price,
        discount: pricing.discount / quantity,
        subtotal: (category.price * quantity - pricing.discount) / quantity
      })),
      platformFee: pricing.platformFeeAmount,
      totalAmount: pricing.total,
      cashfreeOrderId: orderId,
      status: 'pending'
    })

    await transaction.save()

    // For testing/MVP: If Cashfree credentials are not set, auto-complete transaction instantly
    const isMockPayment = !process.env.CASHFREE_APP_ID || process.env.CASHFREE_ENV === 'sandbox'

    if (isMockPayment) {
      // Mock payment completion
      transaction.status = 'completed'
      transaction.cashfreePaymentId = `pay_mock_${Date.now()}`
      await transaction.save()

      // Increment sold count
      category.sold += quantity
      await event.save()

      return res.json({
        success: true,
        data: {
          transaction,
          tickets: savedTickets,
          message: 'Purchase completed instantly via Mock Sandbox Pay'
        }
      })
    }

    // Return session id for real Cashfree checkout integration
    return res.json({
      success: true,
      data: {
        transaction,
        orderId,
        paymentSessionId: `session_mock_${Date.now()}`, // Would be fetched from Cashfree in production
        cashfreeAppId: process.env.CASHFREE_APP_ID
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/tickets/my-tickets - Get current logged-in user's tickets
router.get('/my-tickets', authenticate, async (req, res, next) => {
  try {
    const { status } = req.query
    const query = { userId: req.user._id }
    if (status) {
      query.status = status
    }

    const tickets = await Ticket.find(query)
      .populate('eventId', 'title dates location media')
      .sort({ createdAt: -1 })

    return res.json({ success: true, data: tickets })
  } catch (err) {
    next(err)
  }
})

// GET /api/tickets/:ticketNumber - Retrieve single ticket and sign dynamic QR
router.get('/:ticketNumber', authenticate, async (req, res, next) => {
  try {
    const { ticketNumber } = req.params
    const ticket = await Ticket.findOne({ ticketNumber, userId: req.user._id })
      .populate('eventId', 'title dates location media')

    if (!ticket) {
      return res.status(404).json({ success: false, error: { code: 'TICKET_NOT_FOUND', message: 'Ticket not found' } })
    }

    // Generate dynamic signed JWT that expires in 30 seconds
    const signedJWT = jwt.sign(
      { ticketId: ticket._id, ticketNumber: ticket.ticketNumber },
      ticket.qrSecret,
      { expiresIn: 30 } // 30s expiry
    )

    const qrPayload = `passwale://ticket/${ticket.ticketNumber}/${signedJWT}`
    
    // Create direct URL to render the QR with payload
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrPayload)}`

    return res.json({
      success: true,
      data: {
        ticket,
        qrPayload,
        qrCodeUrl
      }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/tickets/check-in - Verify and check in ticket
router.post('/check-in', authenticate, authorize('organizer', 'volunteer', 'admin'), async (req, res, next) => {
  try {
    const { qrPayload, ticketNumber } = req.body

    let resolvedTicketNumber = ticketNumber
    let receivedJwt = null

    if (qrPayload && qrPayload.startsWith('passwale://ticket/')) {
      const parts = qrPayload.replace('passwale://ticket/', '').split('/')
      resolvedTicketNumber = parts[0]
      receivedJwt = parts[1]
    }

    if (!resolvedTicketNumber) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'QR payload or ticket number is required' } })
    }

    const ticket = await Ticket.findOne({ ticketNumber: resolvedTicketNumber })
    if (!ticket) {
      return res.status(404).json({ success: false, error: { code: 'TICKET_NOT_FOUND', message: 'Invalid ticket number' } })
    }

    if (ticket.status === 'used') {
      return res.status(400).json({ success: false, error: { code: 'ALREADY_USED', message: 'Ticket has already been checked in' } })
    }

    if (ticket.status !== 'active') {
      return res.status(400).json({ success: false, error: { code: 'TICKET_INACTIVE', message: `Ticket is ${ticket.status}` } })
    }

    // Verify dynamic JWT key if scanned from QR payload
    if (receivedJwt) {
      try {
        jwt.verify(receivedJwt, ticket.qrSecret)
      } catch (err) {
        return res.status(400).json({
          success: false,
          error: { code: 'EXPIRED_OR_FAKE', message: 'QR code has expired or is invalid. Please refresh and try again.' }
        })
      }
    }

    ticket.status = 'used'
    ticket.checkedInAt = new Date()
    await ticket.save()

    return res.json({
      success: true,
      data: {
        message: 'Check-in successful',
        holderName: ticket.holderName,
        ticketNumber: ticket.ticketNumber,
        checkedInAt: ticket.checkedInAt
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/tickets/check-in/:eventId/stats - Get check-in statistics
router.get('/check-in/:eventId/stats', authenticate, authorize('organizer', 'admin'), async (req, res, next) => {
  try {
    const { eventId } = req.params
    const totalCount = await Ticket.countDocuments({ eventId })
    const checkedInCount = await Ticket.countDocuments({ eventId, status: 'used' })

    return res.json({
      success: true,
      data: {
        total: totalCount,
        checkedIn: checkedInCount,
        remaining: totalCount - checkedInCount
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
