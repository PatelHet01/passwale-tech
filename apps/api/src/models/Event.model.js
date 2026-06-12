const mongoose = require('mongoose')

const cardBenefitTierSchema = new mongoose.Schema({
  discount:         { type: Number, default: 0 },   // %
  earlyAccessHours: { type: Number, default: 0 },
}, { _id: false })

const ticketCategorySchema = new mongoose.Schema({
  name:         { type: String, required: true },
  description:  String,
  price:        { type: Number, required: true, min: 0 },
  quantity:     { type: Number, required: true, min: 1 },
  sold:         { type: Number, default: 0 },
  salesStart:   Date,
  salesEnd:     Date,
  maxPerOrder:  { type: Number, default: 10 },
  isHidden:     { type: Boolean, default: false },

  isSquadPass: { type: Boolean, default: false },
  squadSettings: {
    minMembers:          { type: Number, default: 4 },
    maxMembers:          { type: Number, default: 8 },
    lockDeadlineMinutes: { type: Number, default: 120 },
    discount:            { type: Number, default: 10 },  // %
  },

  hasTimeSlots: { type: Boolean, default: false },
  timeSlots: [{
    name:      String,
    startTime: Date,
    endTime:   Date,
    capacity:  Number,
    sold:      { type: Number, default: 0 },
  }],

  passwaleCardBenefits: {
    enabled: { type: Boolean, default: false },
    plus:    cardBenefitTierSchema,
    pro:     cardBenefitTierSchema,
    black:   cardBenefitTierSchema,
  },
}, { _id: true })

const eventSchema = new mongoose.Schema({
  organizer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  shortDescription: { type: String, maxLength: 200 },
  description: String,  // rich text HTML

  scenes:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scene' }],
  tags:    [String],
  type:    { type: String, enum: ['free', 'paid', 'donation', 'hybrid'], default: 'paid' },
  category:{ type: String, enum: ['music','workshop','conference','sports','nightlife','campus','festival','other'], default: 'other' },
  status:  { type: String, enum: ['draft','pending','published','cancelled','completed'], default: 'draft' },

  dates: {
    start:       { type: Date, required: true },
    end:         { type: Date, required: true },
    doorsOpen:   Date,
    displayTime: String,
  },

  location: {
    type:         { type: String, enum: ['physical','virtual','hybrid'], default: 'physical' },
    venue:        String,
    address:      String,
    city:         String,
    state:        String,
    country:      { type: String, default: 'India' },
    pincode:      String,
    // GeoJSON Point — enables $near, $geoWithin queries
    coordinates: {
      type:        { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] },  // [longitude, latitude]
    },
    googlePlaceId: String,
    googleMapsUrl: String,
    virtualUrl:    String,
    virtualPlatform: { type: String, enum: ['zoom','teams','youtube','custom'] },
  },

  media: {
    cover:   String,   // S3 URL
    gallery: [String],
    videoUrl: String,
    thumbnailUrl: String,
  },

  lineup: [{
    name:        { type: String, required: true },
    role:        String,
    bio:         String,
    photo:       String,
    socialLinks: { instagram: String, twitter: String, website: String },
    performanceTime: Date,
    order:       Number,
  }],

  ticketCategories: [ticketCategorySchema],

  totalCapacity:   Number,
  resaleEnabled:   { type: Boolean, default: false },
  waitlistEnabled: { type: Boolean, default: false },

  communitySettings: {
    chatEnabled:  { type: Boolean, default: true },
    pollsEnabled: { type: Boolean, default: false },
    qnaEnabled:   { type: Boolean, default: false },
  },

  rules: {
    dressCode:      String,
    ageRestriction: String,
    prohibitedItems:[String],
    guidelines:     String,
  },

  visibility:  { type: String, enum: ['public','private','invite-only'], default: 'public' },

  analytics: {
    pageViews: { type: Number, default: 0 },
    uniqueViews:{ type: Number, default: 0 },
    trafficSources: {
      reel:     { type: Number, default: 0 },
      story:    { type: Number, default: 0 },
      whatsapp: { type: Number, default: 0 },
      direct:   { type: Number, default: 0 },
      search:   { type: Number, default: 0 },
    },
    salesFunnel: {
      views:     { type: Number, default: 0 },
      ticketPage:{ type: Number, default: 0 },
      checkout:  { type: Number, default: 0 },
      purchased: { type: Number, default: 0 },
    },
    revenueTotal: { type: Number, default: 0 },
    ticketsSold:  { type: Number, default: 0 },
  },

  creativeUrls: { story: String, post: String },

  isFeatured:  { type: Boolean, default: false },
  cancelReason: String,
  cancelledAt:  Date,

  publishedAt:  Date,
  completedAt:  Date,
}, { timestamps: true })

// Indexes
eventSchema.index({ 'location.coordinates': '2dsphere' })  // Geospatial
eventSchema.index({ slug: 1 })
eventSchema.index({ status: 1, 'dates.start': 1 })
eventSchema.index({ organizer: 1, status: 1 })
eventSchema.index({ scenes: 1, status: 1 })
eventSchema.index({ 'location.city': 1, status: 1 })
eventSchema.index({ 'analytics.revenueTotal': -1 })
eventSchema.index({ isFeatured: 1, 'dates.start': 1 })
eventSchema.index({ title: 'text', shortDescription: 'text', tags: 'text' })  // Full-text search

// Auto-slug from title
eventSchema.pre('save', async function () {
  if (this.isModified('title') && !this.slug) {
    let base = this.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 60)
    let slug = base
    let i = 1
    while (await mongoose.model('Event').findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${base}-${i++}`
    }
    this.slug = slug
  }
  if (this.status === 'published' && !this.publishedAt) this.publishedAt = new Date()
})

module.exports = mongoose.model('Event', eventSchema)
