const cron = require('node-cron')
const Squad = require('../models/Squad.model')

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  console.log('⏰ Running squad lock deadline check job...')
  try {
    const now = new Date()
    const result = await Squad.updateMany(
      {
        status: 'forming',
        lockDeadline: { $lt: now }
      },
      {
        $set: { status: 'cancelled' }
      }
    )
    if (result.modifiedCount > 0) {
      console.log(`✅ Cancelled ${result.modifiedCount} squads that missed the deadline.`)
    }
  } catch (err) {
    console.error('❌ Error executing squad cleanup job:', err)
  }
})
