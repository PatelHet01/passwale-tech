const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const Transaction = require('../models/Transaction.model')
const Ticket = require('../models/Ticket.model')
const Event = require('../models/Event.model')

// POST /api/webhooks/cashfree - Cashfree webhook handler
router.post('/cashfree', async (req, res, next) => {
  try {
    const signature = req.headers['x-webhook-signature']
    const timestamp = req.headers['x-webhook-timestamp']
    const secret = process.env.CASHFREE_WEBHOOK_SECRET

    // Signature verification (only in production or when secret exists)
    if (secret && signature && timestamp) {
      const payload = timestamp + JSON.stringify(req.body)
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64')

      if (signature !== expectedSignature) {
        return res.status(400).json({ success: false, error: { message: 'Invalid webhook signature' } })
      }
    }

    const { data } = req.body
    if (!data || !data.order || !data.payment) {
      return res.status(400).json({ success: false, error: { message: 'Invalid event data format' } })
    }

    const orderId = data.order.order_id
    const paymentStatus = data.payment.payment_status // 'SUCCESS' | 'FAILED' | 'PENDING'
    const paymentId = data.payment.cf_payment_id

    // Check transaction in DB
    const transaction = await Transaction.findOne({ cashfreeOrderId: orderId })
    if (!transaction) {
      return res.status(404).json({ success: false, error: { message: 'Transaction not found for order' } })
    }

    // Idempotency: skip if already processed
    if (transaction.status === 'completed') {
      return res.json({ success: true, message: 'Already processed' })
    }

    if (paymentStatus === 'SUCCESS') {
      transaction.status = 'completed'
      transaction.cashfreePaymentId = paymentId
      await transaction.save()

      // Activate all tickets associated with this transaction
      const ticketIds = transaction.tickets.map(t => t.ticketId)
      await Ticket.updateMany(
        { _id: { $in: ticketIds } },
        { $set: { status: 'active' } }
      )

      // Increment Event Category sold numbers
      const event = await Event.findById(transaction.eventId)
      if (event) {
        for (const tItem of transaction.tickets) {
          const category = event.ticketCategories.id(tItem.categoryId)
          if (category) {
            category.sold += 1
          }
        }
        await event.save()
      }

      console.log(`✅ Webhook: Transaction ${orderId} successfully completed. Tickets activated.`)
    } else if (paymentStatus === 'FAILED') {
      transaction.status = 'failed'
      await transaction.save()

      // Cancel tickets
      const ticketIds = transaction.tickets.map(t => t.ticketId)
      await Ticket.updateMany(
        { _id: { $in: ticketIds } },
        { $set: { status: 'cancelled' } }
      )
      console.log(`❌ Webhook: Transaction ${orderId} marked as failed.`)
    }

    return res.json({ success: true, data: { status: transaction.status } })
  } catch (err) {
    next(err)
  }
})

module.exports = router
