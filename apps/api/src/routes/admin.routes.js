const express = require('express')
const router = express.Router()
const { authenticate, authorize } = require('../middleware/authenticate')
const AdminSettings = require('../models/AdminSettings.model')
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const AuditLog = require('../models/AuditLog.model')
const Transaction = require('../models/Transaction.model')
const Payout = require('../models/Payout.model')
const Refund = require('../models/Refund.model')

// Helper for auditing admin actions
async function logAdminAction(adminId, action, targetType, targetId, before, after, req) {
  try {
    const log = new AuditLog({
      adminId,
      action,
      targetType,
      targetId,
      before,
      after,
      ip: req.ip,
      userAgent: req.headers['user-agent']
    })
    await log.save()
  } catch (err) {
    console.error('❌ Failed to log admin action:', err)
  }
}

// Ensure all admin routes are protected by admin authorization
router.use(authenticate, authorize('admin', 'super_admin'))

// GET /api/admin/pricing - get current pricing config
router.get('/pricing', async (req, res, next) => {
  try {
    const settings = await AdminSettings.getInstance()
    return res.json({ success: true, data: settings })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/pricing - update pricing settings
router.patch('/pricing', async (req, res, next) => {
  try {
    const settings = await AdminSettings.getInstance()
    const before = settings.toObject()

    Object.assign(settings, req.body)
    await settings.save()

    const after = settings.toObject()
    await logAdminAction(req.user._id, 'UPDATE_PRICING', 'AdminSettings', settings._id, before, after, req)

    return res.json({ success: true, data: settings })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/organizers/:id/commission - override commission rate
router.patch('/organizers/:id/commission', async (req, res, next) => {
  try {
    const { id } = req.params
    const { commissionOverride } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } })
    }

    const before = { commissionOverride: user.organizerProfile.commissionOverride }
    user.organizerProfile.commissionOverride = commissionOverride
    await user.save()
    const after = { commissionOverride: user.organizerProfile.commissionOverride }

    await logAdminAction(req.user._id, 'OVERRIDE_COMMISSION', 'User', user._id, before, after, req)

    return res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/financials - financial metrics overview
router.get('/financials', async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ status: 'completed' })
    const payouts = await Payout.find()
    const refunds = await Refund.find()

    const gmv = transactions.reduce((acc, t) => acc + t.totalAmount, 0)
    const platformRevenue = transactions.reduce((acc, t) => acc + t.platformFee, 0)
    const commissions = platformRevenue // MVP mock simplification
    const paidPayouts = payouts.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.netAmount, 0)
    const pendingPayouts = payouts.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.netAmount, 0)

    return res.json({
      success: true,
      data: {
        gmv,
        platformRevenue,
        commissions,
        payouts: { completed: paidPayouts, pending: pendingPayouts },
        refundsCount: refunds.length
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/users - list users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash')
    return res.json({ success: true, data: users })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/users/:id/block - block/unblock users
router.patch('/users/:id/block', async (req, res, next) => {
  try {
    const { id } = req.params
    const { isBlocked, blockReason } = req.body

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ success: false, error: { code: 'USER_NOT_FOUND', message: 'User not found' } })
    }

    const before = { isBlocked: user.isBlocked, blockReason: user.blockReason }
    user.isBlocked = isBlocked
    user.blockReason = blockReason || ''
    await user.save()
    const after = { isBlocked: user.isBlocked, blockReason: user.blockReason }

    await logAdminAction(req.user._id, isBlocked ? 'BLOCK_USER' : 'UNBLOCK_USER', 'User', user._id, before, after, req)

    return res.json({ success: true, data: user })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/events - list all events
router.get('/events', async (req, res, next) => {
  try {
    const events = await Event.find().populate('organizer', 'name email')
    return res.json({ success: true, data: events })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/events/:id/status - approve/reject/cancel event
router.patch('/events/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const before = { status: event.status }
    event.status = status
    await event.save()
    const after = { status: event.status }

    await logAdminAction(req.user._id, 'UPDATE_EVENT_STATUS', 'Event', event._id, before, after, req)

    return res.json({ success: true, data: event })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/audit-logs - list audit logs
router.get('/audit-logs', async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('adminId', 'name email').sort({ createdAt: -1 })
    return res.json({ success: true, data: logs })
  } catch (err) {
    next(err)
  }
})

module.exports = router
