const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/authenticate')
const Event = require('../models/Event.model')
const Ticket = require('../models/Ticket.model')
const Transaction = require('../models/Transaction.model')

// All routes require organizer verification
router.use(authenticate, authorize('organizer', 'admin'))

// GET /api/organizer/dashboard - stats overview
router.get('/dashboard', async (req, res, next) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
    const eventIds = events.map(e => e._id)

    const activeEventsCount = events.filter(e => e.status === 'published').length

    // Find transactions associated with organizer events
    const transactions = await Transaction.find({
      eventId: { $in: eventIds },
      status: 'completed'
    })

    const totalRevenue = transactions.reduce((acc, t) => acc + t.totalAmount, 0)
    const ticketsSold = transactions.reduce((acc, t) => acc + t.tickets.length, 0)

    return res.json({
      success: true,
      data: {
        totalEvents: events.length,
        activeEvents: activeEventsCount,
        totalRevenue,
        ticketsSold
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/organizer/events - get organizer's events list
router.get('/events', async (req, res, next) => {
  try {
    const { status } = req.query
    const query = { organizer: req.user._id }
    if (status) {
      query.status = status
    }

    const events = await Event.find(query).sort({ createdAt: -1 })
    return res.json({ success: true, data: events })
  } catch (err) {
    next(err)
  }
})

// GET /api/organizer/events/:id/analytics - event detailed analytics
router.get('/events/:id/analytics', async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findOne({ _id: id, organizer: req.user._id })
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const tickets = await Ticket.find({ eventId: event._id })
    const totalSold = tickets.length
    const checkedIn = tickets.filter(t => t.status === 'used').length

    // Revenue calculations
    const transactions = await Transaction.find({ eventId: event._id, status: 'completed' })
    const grossRevenue = transactions.reduce((acc, t) => acc + t.totalAmount, 0)
    
    // Simplification for net revenue
    const netRevenue = grossRevenue * 0.85 

    return res.json({
      success: true,
      data: {
        views: event.analytics?.pageViews || 0,
        ticketsSold: totalSold,
        checkedIn,
        grossRevenue,
        netRevenue,
        trafficSources: event.analytics?.trafficSources || { reel: 0, story: 0, whatsapp: 0, direct: 0, search: 0 }
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/organizer/events/:id/attendees - list attendees
router.get('/events/:id/attendees', async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findOne({ _id: id, organizer: req.user._id })
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const tickets = await Ticket.find({ eventId: event._id })
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 })

    return res.json({ success: true, data: tickets })
  } catch (err) {
    next(err)
  }
})

// GET /api/organizer/events/:id/attendees/export - export attendee data as simple CSV
router.get('/events/:id/attendees/export', async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findOne({ _id: id, organizer: req.user._id })
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const tickets = await Ticket.find({ eventId: event._id }).populate('userId', 'name email phone')

    let csvContent = 'TicketNumber,HolderName,Email,Phone,Status,CheckedInAt\n'
    for (const ticket of tickets) {
      const user = ticket.userId || {}
      const checkedInTime = ticket.checkedInAt ? ticket.checkedInAt.toISOString() : ''
      csvContent += `"${ticket.ticketNumber}","${ticket.holderName}","${user.email || ''}","${user.phone || ''}","${ticket.status}","${checkedInTime}"\n`
    }

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename=attendees_${event.slug}.csv`)
    return res.status(200).send(csvContent)
  } catch (err) {
    next(err)
  }
})

module.exports = router
