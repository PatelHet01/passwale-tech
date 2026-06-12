const cron = require('node-cron')
const Subscription = require('../models/Subscription.model')
const User = require('../models/User.model')

// Run daily at 1:00 AM
cron.schedule('0 1 * * *', async () => {
  console.log('⏰ Running subscription expiry check job...')
  try {
    const now = new Date()
    // Find all active subscriptions that have expired
    const expiredSubs = await Subscription.find({
      status: 'active',
      expiresAt: { $lt: now }
    })

    for (const sub of expiredSubs) {
      sub.status = 'expired'
      await sub.save()

      // Update User profile back to free
      await User.findByIdAndUpdate(sub.userId, {
        'passwaleCard.tier': 'free'
      })
      console.log(`📉 Downgraded user ${sub.userId} subscription tier to free.`)
    }
  } catch (err) {
    console.error('❌ Error executing subscription check job:', err)
  }
})
