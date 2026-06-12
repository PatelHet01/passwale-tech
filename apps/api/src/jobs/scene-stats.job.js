const cron = require('node-cron')
const Scene = require('../models/Scene.model')
const User = require('../models/User.model')

// Run nightly at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('⏰ Running scene stats and leaderboard aggregation job...')
  try {
    // Basic stats aggregation logic (MVP placeholders/stub logic)
    const scenes = await Scene.find()
    for (const scene of scenes) {
      // In a real application, calculate growth rate, active users, etc.
      scene.stats.activeUsers = await User.countDocuments({ scenePreferences: scene._id })
      await scene.save()
    }
    console.log('✅ Scene stats aggregated successfully')
  } catch (err) {
    console.error('❌ Error executing scene stats job:', err)
  }
})
