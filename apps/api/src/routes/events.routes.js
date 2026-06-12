const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')
const { authenticate } = require('../middleware/authenticate')

// GET /api/events - search and filter events
router.get('/', async (req, res, next) => {
  try {
    const { scene, city, dateFrom, dateTo, type, minPrice, maxPrice, latitude, longitude, radius, sort, page = 1, limit = 12 } = req.query
    const query = { status: 'published' }

    if (scene) {
      query.scenes = scene
    }
    if (city) {
      query['location.city'] = new RegExp(city, 'i')
    }
    if (type) {
      query.type = type
    }
    if (minPrice || maxPrice) {
      query['ticketCategories.price'] = {}
      if (minPrice) query['ticketCategories.price'].$gte = parseFloat(minPrice)
      if (maxPrice) query['ticketCategories.price'].$lte = parseFloat(maxPrice)
    }
    if (dateFrom || dateTo) {
      query['dates.start'] = {}
      if (dateFrom) query['dates.start'].$gte = new Date(dateFrom)
      if (dateTo) query['dates.start'].$lte = new Date(dateTo)
    }

    // Geospatial search: find events within radius in meters
    if (latitude && longitude) {
      const lat = parseFloat(latitude)
      const lng = parseFloat(longitude)
      const maxDistance = parseFloat(radius) || 10000 // default 10km

      query['location.coordinates'] = {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: maxDistance
        }
      }
    }

    // Sorting
    let sortOption = { 'dates.start': 1 }
    if (sort === 'trending') {
      sortOption = { 'analytics.pageViews': -1 }
    } else if (sort === 'price_asc') {
      sortOption = { 'ticketCategories.price': 1 }
    } else if (sort === 'price_desc') {
      sortOption = { 'ticketCategories.price': -1 }
    }

    const skipIndex = (parseInt(page) - 1) * parseInt(limit)
    const events = await Event.find(query)
      .populate('organizer', 'name profilePhoto')
      .populate('scenes', 'name color')
      .sort(sortOption)
      .skip(skipIndex)
      .limit(parseInt(limit))

    const total = await Event.countDocuments(query)

    return res.json({
      success: true,
      data: events,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total
      }
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/events/trending - get top trending events
router.get('/trending', async (req, res, next) => {
  try {
    const events = await Event.find({ status: 'published' })
      .populate('organizer', 'name profilePhoto')
      .sort({ 'analytics.pageViews': -1 })
      .limit(6)
    return res.json({ success: true, data: events })
  } catch (err) {
    next(err)
  }
})

// GET /api/events/recommended - user recommended events based on scene preferences
router.get('/recommended', authenticate, async (req, res, next) => {
  try {
    const query = { status: 'published' }
    if (req.user.scenePreferences && req.user.scenePreferences.length > 0) {
      query.scenes = { $in: req.user.scenePreferences }
    }
    const events = await Event.find(query)
      .populate('organizer', 'name profilePhoto')
      .limit(6)
    return res.json({ success: true, data: events })
  } catch (err) {
    next(err)
  }
})

// GET /api/events/search - text search
router.get('/search', async (req, res, next) => {
  try {
    const { q } = req.query
    if (!q) {
      return res.status(400).json({ success: false, error: { code: 'QUERY_REQUIRED', message: 'Query string q is required' } })
    }

    // Full text search if text index is set, fallback to regex
    const events = await Event.find({
      status: 'published',
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { shortDescription: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    }).populate('organizer', 'name profilePhoto')

    return res.json({ success: true, data: events })
  } catch (err) {
    next(err)
  }
})

// GET /api/events/slug/:slug - get event details by slug
router.get('/slug/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params
    const event = await Event.findOne({ slug })
      .populate('organizer', 'name profilePhoto organizerProfile')
      .populate('scenes', 'name color CoverImage')
    
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    // Increment page view analytics
    event.analytics = event.analytics || {}
    event.analytics.pageViews = (event.analytics.pageViews || 0) + 1
    
    // Track traffic source if provided
    const { ref } = req.query
    if (ref && event.analytics.trafficSources) {
      const source = ['reel', 'story', 'whatsapp', 'direct', 'search'].includes(ref) ? ref : 'direct'
      event.analytics.trafficSources[source] = (event.analytics.trafficSources[source] || 0) + 1
    }

    await event.save()

    return res.json({ success: true, data: event })
  } catch (err) {
    next(err)
  }
})

// POST /api/events - create draft
router.post('/', authenticate, async (req, res, next) => {
  try {
    const eventData = req.body
    
    // Set auto-slug
    const baseSlug = eventData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const slug = `${baseSlug}-${randomSuffix}`

    const event = new Event({
      ...eventData,
      slug,
      organizer: req.user._id,
      status: 'draft'
    })

    await event.save()
    return res.status(201).json({ success: true, data: event })
  } catch (err) {
    next(err)
  }
})

// PATCH /api/events/:id - update event details
router.patch('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    if (event.organizer.toString() !== req.user._id.toString() && !req.user.roles.includes('admin')) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized to modify this event' } })
    }

    Object.assign(event, req.body)
    await event.save()

    return res.json({ success: true, data: event })
  } catch (err) {
    next(err)
  }
})

// POST /api/events/:id/publish - publish event (requires verification rules)
router.post('/:id/publish', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)

    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    if (event.organizer.toString() !== req.user._id.toString() && !req.user.roles.includes('admin')) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized to modify this event' } })
    }

    // Validation checks for publishing
    if (!event.title || !event.dates.start || !event.location.address || !event.media.cover) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_FAILED', message: 'Cannot publish event. Missing required basics: title, start date, address, or cover image.' }
      })
    }

    if (!event.ticketCategories || event.ticketCategories.length === 0) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_FAILED', message: 'Cannot publish event. Must define at least one ticket category.' }
      })
    }

    event.status = 'published'
    await event.save()

    return res.json({ success: true, data: event })
  } catch (err) {
    next(err)
  }
})

// POST /api/events/:id/duplicate - duplicate event
router.post('/:id/duplicate', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const sourceEvent = await Event.findById(id)
    if (!sourceEvent) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    const eventObj = sourceEvent.toObject()
    delete eventObj._id
    delete eventObj.createdAt
    delete eventObj.updatedAt
    
    // Generate new slug
    const baseSlug = eventObj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    eventObj.slug = `${baseSlug}-dup-${randomSuffix}`
    eventObj.status = 'draft'
    eventObj.organizer = req.user._id
    eventObj.analytics = { pageViews: 0, trafficSources: { reel: 0, story: 0, whatsapp: 0, direct: 0, search: 0 } }

    const duplicatedEvent = new Event(eventObj)
    await duplicatedEvent.save()

    return res.status(201).json({ success: true, data: duplicatedEvent })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/events/:id - delete event
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    
    if (!event) {
      return res.status(404).json({ success: false, error: { code: 'EVENT_NOT_FOUND', message: 'Event not found' } })
    }

    if (event.organizer.toString() !== req.user._id.toString() && !req.user.roles.includes('admin')) {
      return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Not authorized to delete this event' } })
    }

    await Event.findByIdAndDelete(id)
    return res.json({ success: true, data: { message: 'Event deleted successfully' } })
  } catch (err) {
    next(err)
  }
})

module.exports = router
