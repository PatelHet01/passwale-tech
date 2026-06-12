const express = require('express')
const router = express.Router()
const Scene = require('../models/Scene.model')
const Event = require('../models/Event.model')
const User = require('../models/User.model')
const { authenticate } = require('../middleware/authenticate')

// GET /api/scenes - list all scenes
router.get('/', async (req, res, next) => {
  try {
    const scenes = await Scene.find({ isActive: true })
    return res.json({ success: true, data: scenes })
  } catch (err) {
    next(err)
  }
})

// GET /api/scenes/:slug - get scene details and upcoming events
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params
    const scene = await Scene.findOne({ slug, isActive: true }).populate('ambassador', 'name profilePhoto')
    if (!scene) {
      return res.status(404).json({ success: false, error: { code: 'SCENE_NOT_FOUND', message: 'Scene not found' } })
    }

    // Fetch upcoming events for this scene
    const events = await Event.find({
      scenes: scene._id,
      status: 'published',
      'dates.start': { $gte: new Date() }
    }).populate('organizer', 'name profilePhoto')

    return res.json({
      success: true,
      data: { scene, events }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/scenes/select - select user scene preferences
router.post('/select', authenticate, async (req, res, next) => {
  try {
    const { sceneIds } = req.body
    if (!Array.isArray(sceneIds)) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'sceneIds must be an array' } })
    }

    req.user.scenePreferences = sceneIds
    await req.user.save()

    return res.json({ success: true, data: { scenePreferences: req.user.scenePreferences } })
  } catch (err) {
    next(err)
  }
})

// GET /api/scenes/:slug/leaderboard - top attendees for this scene
router.get('/:slug/leaderboard', async (req, res, next) => {
  try {
    const { slug } = req.params
    const scene = await Scene.findOne({ slug })
    if (!scene) {
      return res.status(404).json({ success: false, error: { code: 'SCENE_NOT_FOUND', message: 'Scene not found' } })
    }

    // Aggregate top attendees based on attendance streak / count in user's sceneStats
    // For MVP, return users with matching scene preferences sorted by PassCoins or mock values
    const topAttendees = await User.find({
      scenePreferences: scene._id
    })
      .select('name profilePhoto passCoinBalance')
      .sort({ passCoinBalance: -1 })
      .limit(10)

    // Map to custom leaderboard output format
    const leaderboard = topAttendees.map((u, index) => ({
      rank: index + 1,
      userId: u._id,
      name: u.name,
      profilePhoto: u.profilePhoto,
      streak: Math.floor(Math.random() * 5) + 1, // Mock streak count
      score: u.passCoinBalance
    }))

    return res.json({ success: true, data: leaderboard })
  } catch (err) {
    next(err)
  }
})

module.exports = router
