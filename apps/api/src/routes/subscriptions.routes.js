const express = require('express')
const router = express.Router()
const { authenticate } = require('../middleware/authenticate')
const Subscription = require('../models/Subscription.model')
const User = require('../models/User.model')
const AdminSettings = require('../models/AdminSettings.model')

// All routes require auth
router.use(authenticate)

// GET /api/subscriptions/my-card - get current user's card
router.get('/my-card', async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id, status: 'active' })
    return res.json({
      success: true,
      data: {
        tier: req.user.passwaleCard.tier,
        expiresAt: req.user.passwaleCard.expiresAt,
        subscription
      }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/subscriptions/purchase - purchase subscription
router.post('/purchase', async (req, res, next) => {
  try {
    const { tier, billingCycle = 'monthly' } = req.body // tier: 'plus' | 'pro'
    if (!['plus', 'pro'].includes(tier)) {
      return res.status(400).json({ success: false, error: { code: 'INVALID_TIER', message: 'Tier must be plus or pro' } })
    }

    const settings = await AdminSettings.getInstance()
    const pricing = settings.cardPricing[tier]
    const amount = billingCycle === 'annual' ? pricing.annual : pricing.monthly

    // Calculate subscription period
    const start = new Date()
    const expires = new Date()
    if (billingCycle === 'annual') {
      expires.setFullYear(expires.getFullYear() + 1)
    } else {
      expires.setMonth(expires.getMonth() + 1)
    }

    // Deactivate existing subscription if any
    await Subscription.updateMany(
      { userId: req.user._id, status: 'active' },
      { $set: { status: 'expired' } }
    )

    // Create Subscription log
    const subscription = new Subscription({
      userId: req.user._id,
      tier,
      cashfreeSubscriptionId: `sub_mock_${Date.now()}`,
      status: 'active',
      startedAt: start,
      expiresAt: expires,
      autoRenew: true,
      billingHistory: [{
        date: start,
        amount,
        invoiceUrl: `https://passwale.com/invoices/mock_${Date.now()}.pdf`
      }]
    })

    await subscription.save()

    // Update user profile tier
    req.user.passwaleCard = {
      tier,
      expiresAt: expires,
      startedAt: start
    }
    await req.user.save()

    return res.json({
      success: true,
      data: {
        subscription,
        user: {
          name: req.user.name,
          passwaleCard: req.user.passwaleCard
        }
      }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/subscriptions/cancel - cancel auto renew
router.post('/cancel', async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user._id, status: 'active' })
    if (!subscription) {
      return res.status(404).json({ success: false, error: { code: 'NO_ACTIVE_SUBSCRIPTION', message: 'No active subscription found' } })
    }

    subscription.autoRenew = false
    await subscription.save()

    return res.json({ success: true, data: subscription })
  } catch (err) {
    next(err)
  }
})

// POST /api/subscriptions/upgrade - upgrade tier
router.post('/upgrade', async (req, res, next) => {
  try {
    const { targetTier } = req.body
    if (targetTier !== 'pro') {
      return res.status(400).json({ success: false, error: { code: 'INVALID_UPGRADE', message: 'Upgrade is only supported to Pro tier' } })
    }

    const currentTier = req.user.passwaleCard.tier
    if (currentTier === 'pro' || currentTier === 'black') {
      return res.status(400).json({ success: false, error: { code: 'INVALID_UPGRADE', message: 'User is already at Pro or higher' } })
    }

    // Direct mock upgrade
    const expires = new Date()
    expires.setMonth(expires.getMonth() + 1)

    await Subscription.updateMany(
      { userId: req.user._id, status: 'active' },
      { $set: { status: 'expired' } }
    )

    const subscription = new Subscription({
      userId: req.user._id,
      tier: 'pro',
      cashfreeSubscriptionId: `sub_mock_${Date.now()}`,
      status: 'active',
      startedAt: new Date(),
      expiresAt: expires,
      autoRenew: true,
      billingHistory: [{
        date: new Date(),
        amount: 599, // Pro rate
        invoiceUrl: `https://passwale.com/invoices/mock_${Date.now()}.pdf`
      }]
    })

    await subscription.save()

    req.user.passwaleCard = {
      tier: 'pro',
      expiresAt: expires,
      startedAt: new Date()
    }
    await req.user.save()

    return res.json({ success: true, data: subscription })
  } catch (err) {
    next(err)
  }
})

module.exports = router
