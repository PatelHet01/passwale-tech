const mongoose = require('mongoose')

const sceneSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  slug:         { type: String, required: true, unique: true, lowercase: true },
  color:        { type: String, required: true },   // hex
  coverImage:   String,
  description:  String,
  isActive:     { type: Boolean, default: true },
  isFeatured:   { type: Boolean, default: false },
  ambassador:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stats: {
    totalEvents:    { type: Number, default: 0 },
    totalAttendees: { type: Number, default: 0 },
    activeUsers:    { type: Number, default: 0 },
    growthRate:     { type: Number, default: 0 },    // % month-over-month
  },
  treasury: {
    balance:    { type: Number, default: 0 },
    allocated:  { type: Number, default: 0 },
  },
  displayOrder: { type: Number, default: 0 },
}, { timestamps: true })

sceneSchema.index({ slug: 1 })
sceneSchema.index({ isActive: 1, displayOrder: 1 })

module.exports = mongoose.model('Scene', sceneSchema)
