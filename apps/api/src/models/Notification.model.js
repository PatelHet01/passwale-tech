const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:     { type: String, required: true }, // e.g., 'TICKET_PURCHASED', 'EVENT_REMINDER'
  title:    { type: String, required: true },
  body:     { type: String, required: true },
  data:     { type: mongoose.Schema.Types.Mixed },
  read:     { type: Boolean, default: false },
  channels: {
    inApp: { type: Boolean, default: true },
    email: { type: Boolean, default: false },
    sms:   { type: Boolean, default: false },
    push:  { type: Boolean, default: false }
  },
  readAt:   { type: Date }
}, {
  timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)
