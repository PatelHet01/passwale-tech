const mongoose = require('mongoose')

const passCollectionSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:        { type: String, required: true },
  slug:        { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  cover:       { type: String }, // S3 URL
  events:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  seasonPass: {
    enabled:    { type: Boolean, default: false },
    price:      { type: Number },
    validCount: { type: Number } // how many events in the collection the pass covers
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('PassCollection', passCollectionSchema)
