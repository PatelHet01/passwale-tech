const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const Squad = require('../models/Squad.model')
const Event = require('../models/Event.model')
const { authenticate } = require('../middleware/authenticate')

// POST /api/squads/create - Create a squad
router.post('/create', authenticate, async (req, res, next) => {
  try {
    const { eventId, categoryId, name } = req.body

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const category = event.ticketCategories.id(categoryId)
    if (!category) {
      return res.status(404).json({ success: false, error: { code: 'CATEGORY_NOT_FOUND', message: 'Ticket category not found' } })
    }

    if (!category.isSquadPass) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_CATEGORY', message: 'This ticket category is not configured for Squad Passes' } })
    }

    const inviteCode = crypto.randomBytes(4).toString('hex').toUpperCase()
    const lockDeadline = new Date()
    const minutes = category.squadSettings?.lockDeadlineMinutes || 60
    lockDeadline.setMinutes(lockDeadline.getMinutes() + minutes)

    const squad = new Squad({
      eventId: event._id,
      categoryId: category._id,
      creatorId: req.user._id,
      name,
      inviteCode,
      members: [{
        userId: req.user._id,
        joinedAt: new Date()
      }],
      minMembers: category.squadSettings?.minMembers || 4,
      maxMembers: category.squadSettings?.maxMembers || 10,
      lockDeadline,
      discount: category.squadSettings?.discount || 10,
      status: 'forming'
    })

    await squad.save()

    return res.status(201).json({ success: true, data: squad })
  } catch (err) {
    next(err)
  }
})

// GET /api/squads/:inviteCode - Public lookup
router.get('/:inviteCode', async (req, res, next) => {
  try {
    const { inviteCode } = req.params
    const squad = await Squad.findOne({ inviteCode })
      .populate('eventId', 'title dates location media')
      .populate('members.userId', 'name profilePhoto')

    if (!squad) {
      return res.status(404).json({ success: false, error: { code: 'SQUAD_NOT_FOUND', message: 'Squad not found' } })
    }

    return res.json({ success: true, data: squad })
  } catch (err) {
    next(err)
  }
})

// POST /api/squads/:id/join - Join a squad
router.post('/:id/join', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const squad = await Squad.findById(id)

    if (!squad) {
      return res.status(404).json({ success: false, error: { code: 'SQUAD_NOT_FOUND', message: 'Squad not found' } })
    }

    if (squad.status !== 'forming') {
      return res.status(400).json({ success: false, error: { code: 'SQUAD_LOCKED', message: `Squad is already ${squad.status}` } })
    }

    if (squad.lockDeadline < new Date()) {
      squad.status = 'cancelled'
      await squad.save()
      return res.status(400).json({ success: false, error: { code: 'DEADLINE_EXPIRED', message: 'Squad lock deadline has expired' } })
    }

    // Check duplicate join
    const isMember = squad.members.some(m => m.userId.toString() === req.user._id.toString())
    if (isMember) {
      return res.status(400).json({ success: false, error: { code: 'ALREADY_JOINED', message: 'You have already joined this squad' } })
    }

    if (squad.members.length >= squad.maxMembers) {
      return res.status(400).json({ success: false, error: { code: 'SQUAD_FULL', message: 'Squad is already full' } })
    }

    squad.members.push({
      userId: req.user._id,
      joinedAt: new Date()
    })

    await squad.save()

    // Trigger Socket.io real-time update
    const io = req.app.get('io')
    if (io) {
      io.to(`squad:${squad._id}`).emit('member-joined', {
        squadId: squad._id,
        user: {
          _id: req.user._id,
          name: req.user.name,
          profilePhoto: req.user.profilePhoto
        },
        membersCount: squad.members.length
      })
    }

    return res.json({ success: true, data: squad })
  } catch (err) {
    next(err)
  }
})

// POST /api/squads/:id/lock - Manually lock the squad when minMembers is met
router.post('/:id/lock', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const squad = await Squad.findById(id)

    if (!squad) {
      return res.status(404).json({ success: false, error: { code: 'SQUAD_NOT_FOUND', message: 'Squad not found' } })
    }

    if (squad.creatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Only the squad creator can lock the squad' } })
    }

    if (squad.members.length < squad.minMembers) {
      return res.status(400).json({ success: false, error: { code: 'INSUFFICIENT_MEMBERS', message: `Cannot lock squad yet. Needs at least ${squad.minMembers} members.` } })
    }

    squad.status = 'locked'
    await squad.save()

    // Notify room
    const io = req.app.get('io')
    if (io) {
      io.to(`squad:${squad._id}`).emit('squad-locked', { squadId: squad._id })
    }

    return res.json({ success: true, data: squad })
  } catch (err) {
    next(err)
  }
})

module.exports = router
