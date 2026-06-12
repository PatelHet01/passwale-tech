require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const AdminSettings = require('../models/AdminSettings.model')
const Scene = require('../models/Scene.model')
const User = require('../models/User.model')
const Event = require('../models/Event.model')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/passwale'

const scenesData = [
  { name: 'Techno', slug: 'techno', color: '#6D28D9', description: 'Underground beats and neon lights' },
  { name: 'Bollywood', slug: 'bollywood', color: '#DC2626', description: 'Dazzling dance hits and retro cinematic vibes' },
  { name: 'Garba', slug: 'garba', color: '#D97706', description: 'Folk rhythms and energetic circular dances' },
  { name: 'Campus', slug: 'campus', color: '#2563EB', description: 'College fests, hackathons, and varsity meetups' },
  { name: 'Comedy', slug: 'comedy', color: '#059669', description: 'Standup nights and open mics' },
  { name: 'Startup', slug: 'startup', color: '#0891B2', description: 'Networking mixers, panels, and pitch nights' }
]

async function seed() {
  try {
    console.log('🌱 Connecting to database:', MONGODB_URI)
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // 1. Seed AdminSettings Singleton
    console.log('⚙️ Seeding AdminSettings...')
    await AdminSettings.deleteMany({}) // Reset admin settings
    const adminSettings = new AdminSettings({
      platformFee: 3.69,
      commissionTiers: [
        { name: 'Starter', minGMV: 0, maxGMV: 100000, rate: 15 },
        { name: 'Growth', minGMV: 100001, maxGMV: 500000, rate: 12 },
        { name: 'Scale', minGMV: 500001, maxGMV: 2000000, rate: 10 },
        { name: 'Pro', minGMV: 2000001, maxGMV: 10000000, rate: 8 },
        { name: 'Elite', minGMV: 10000001, maxGMV: Infinity, rate: 5 }
      ],
      volunteerFeePercent: 5,
      vendorCommissionPercent: 8,
      cardPricing: {
        plus: { monthly: 199, annual: 1999 },
        pro: { monthly: 599, annual: 5999 }
      },
      cardSubsidy: { platformPercent: 60, organizerPercent: 40 },
      resaleFees: { standard: 100, priority: 199, guaranteed: 299 },
      passCoinConfig: {
        earningRate: { free: 1, plus: 2, pro: 3, black: 5 },
        expiryDays: { free: 90, plus: 180, pro: 365, black: 730 }
      }
    })
    await adminSettings.save()
    console.log('✅ AdminSettings seeded.')

    // 2. Seed Scenes
    console.log('🎭 Seeding Scenes...')
    await Scene.deleteMany({})
    const createdScenes = []
    for (const sceneData of scenesData) {
      const scene = new Scene({
        ...sceneData,
        coverImage: `https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop`,
        isActive: true,
        stats: { totalEvents: 0, totalAttendees: 0, growthRate: 0, activeUsers: 0 }
      })
      await scene.save()
      createdScenes.push(scene)
    }
    console.log('✅ Scenes seeded.')

    // 3. Seed Super Admin
    console.log('👤 Seeding Admin User...')
    await User.deleteMany({ email: 'admin@passwale.com' })
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = new User({
      name: 'Passwale Admin',
      email: 'admin@passwale.com',
      phone: '+919999999999',
      passwordHash: hashedPassword,
      roles: ['super_admin', 'admin', 'organizer', 'attendee'],
      activeRole: 'admin',
      emailVerified: true,
      phoneVerified: true,
      passwaleCard: { tier: 'black', expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10) }
    })
    await adminUser.save()
    console.log('✅ Admin User seeded (admin@passwale.com / admin123).')

    // 4. Seed a Test Organizer
    console.log('👤 Seeding Test Organizer User...')
    await User.deleteMany({ email: 'organizer@passwale.com' })
    const organizerPassword = await bcrypt.hash('organizer123', 10)
    const organizerUser = new User({
      name: 'John Organizer',
      email: 'organizer@passwale.com',
      phone: '+918888888888',
      passwordHash: organizerPassword,
      roles: ['organizer', 'attendee'],
      activeRole: 'organizer',
      emailVerified: true,
      phoneVerified: true,
      organizerProfile: {
        commissionOverride: null,
        verificationStatus: 'verified',
        totalGMV: 150000
      }
    })
    await organizerUser.save()
    console.log('✅ Organizer User seeded (organizer@passwale.com / organizer123).')

    // 5. Seed some Test Events
    console.log('🎫 Seeding Test Events...')
    await Event.deleteMany({})

    const upcomingDate = new Date()
    upcomingDate.setDate(upcomingDate.getDate() + 10)
    const endDate = new Date(upcomingDate)
    endDate.setHours(endDate.getHours() + 4)

    const eventsData = [
      {
        title: 'Neon Odyssey Night',
        slug: 'neon-odyssey-night',
        shortDescription: 'Unleash the warehouse beats with international techno talent.',
        description: '<p>Join us for an electrifying night of driving basslines, industrial synths, and state-of-the-art laser visuals.</p>',
        scenes: [createdScenes.find(s => s.slug === 'techno')._id],
        type: 'paid',
        category: 'music',
        status: 'published',
        dates: { start: upcomingDate, end: endDate },
        location: {
          type: 'physical',
          venue: 'Club Warehouse 5',
          address: 'Outer Ring Rd, Bengaluru, Karnataka 560068',
          city: 'Bengaluru',
          state: 'Karnataka',
          coordinates: [77.6322, 12.9221] // [lng, lat]
        },
        media: {
          cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop'
        },
        ticketCategories: [{
          name: 'General Admission',
          description: 'Access to main floor and bar',
          price: 999,
          quantity: 200,
          sold: 10,
          isSquadPass: false,
          passwaleCardBenefits: {
            enabled: true,
            plus: { discount: 10, earlyAccessHours: 24 },
            pro: { discount: 20, earlyAccessHours: 48 },
            black: { discount: 30, earlyAccessHours: 72 }
          }
        }, {
          name: 'Techno Squad Pass',
          description: 'Discounted entry for groups of 4 or more',
          price: 799,
          quantity: 50,
          sold: 0,
          isSquadPass: true,
          squadSettings: { minMembers: 4, maxMembers: 6, lockDeadlineMinutes: 120, discount: 15 },
          passwaleCardBenefits: { enabled: false }
        }]
      },
      {
        title: 'Bollywood Retro Hungama',
        slug: 'bollywood-retro-hungama',
        shortDescription: 'Groove to retro 90s bollywood classics under the stars.',
        description: '<p>Revisit the golden age of dance with Bollywood retro hits played by DJ Bobby. Traditional food counters and photo booths available.</p>',
        scenes: [createdScenes.find(s => s.slug === 'bollywood')._id],
        type: 'paid',
        category: 'festival',
        status: 'published',
        dates: { start: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 6) },
        location: {
          type: 'physical',
          venue: 'Royal Orchid Gardens',
          address: 'Golf Course Road, Bengaluru, Karnataka 560008',
          city: 'Bengaluru',
          state: 'Karnataka',
          coordinates: [77.6413, 12.9602]
        },
        media: {
          cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop'
        },
        ticketCategories: [{
          name: 'Regular pass',
          description: 'Single entry pass',
          price: 499,
          quantity: 500,
          sold: 120,
          isSquadPass: false,
          passwaleCardBenefits: {
            enabled: true,
            plus: { discount: 15, earlyAccessHours: 24 },
            pro: { discount: 25, earlyAccessHours: 48 },
            black: { discount: 50, earlyAccessHours: 72 }
          }
        }]
      }
    ]

    for (const evData of eventsData) {
      const event = new Event({
        ...evData,
        organizer: organizerUser._id
      })
      await event.save()
    }
    console.log('✅ Test Events seeded.')

  } catch (err) {
    console.error('❌ Seeding failed:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Disconnected from MongoDB')
  }
}

seed()
