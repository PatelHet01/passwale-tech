const express = require('express')
const router = express.Router()
const Event = require('../models/Event.model')
const PricingService = require('../services/pricing.service')

// POST /api/pricing/calculate - public pricing preview calculation
router.post('/calculate', async (req, res, next) => {
  try {
    const { basePrice, eventId, categoryId, userId, organizerId, quantity = 1 } = req.body

    let resolvedBasePrice = parseFloat(basePrice)
    let category = null
    let resolvedOrganizerId = organizerId

    // If event and category are passed, resolve category details from DB
    if (eventId && categoryId) {
      const event = await Event.findById(eventId)
      if (event) {
        resolvedOrganizerId = event.organizer.toString()
        category = event.ticketCategories.id(categoryId)
        if (category) {
          resolvedBasePrice = category.price
        }
      }
    }

    if (isNaN(resolvedBasePrice)) {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_INPUT', message: 'basePrice or valid event/category details are required' }
      })
    }

    const pricing = await PricingService.calculateTicketPrice({
      basePrice: resolvedBasePrice,
      category,
      userId,
      organizerId: resolvedOrganizerId,
      quantity
    })

    return res.json({
      success: true,
      data: pricing
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
