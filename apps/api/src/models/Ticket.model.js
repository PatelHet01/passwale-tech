const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true, unique: true },
  eventId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  qrCode:       { type: String }, // S3 URL
  qrSecret:     { type: String, required: true }, // for signing/verifying dynamic QR
  status:       { type: String, enum: ['active', 'used', 'cancelled', 'transferred'], default: 'active' },
  holderName:   { type: String, required: true },
  checkedInAt:  { type: Date }
}, {
  timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)
