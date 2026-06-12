const express = require('express')
const router = express.Router()
const Notification = require('../models/Notification.model')
const { authenticate } = require('../middleware/authenticate')

router.use(authenticate)

// GET /api/notifications - Get all user notifications
router.get('/', async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50)

    return res.json({ success: true, data: notifications })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/notifications/:id/read - Mark one notification as read
router.patch('/:id/read', async (req, res, next) => {
  try {
    const { id } = req.params
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      { $set: { read: true, readAt: new Date() } },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Notification not found' } })
    }

    return res.json({ success: true, data: notification })
  } catch (err) {
    next(err)
  }
})

// POST /api/notifications/read-all - Mark all as read
router.post('/read-all', async (req, res, next) => {
  try {
    await Notification.updateMany(
      { userId: req.user._id, read: false },
      { $set: { read: true, readAt: new Date() } }
    )

    return res.json({ success: true, data: { message: 'All notifications marked as read' } })
  } catch (err) {
    next(err)
  }
})

module.exports = router
