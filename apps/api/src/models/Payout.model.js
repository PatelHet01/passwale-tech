const mongoose = require('mongoose')

const payoutSchema = new mongoose.Schema({
  recipientId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientType:    { type: String, enum: ['organizer', 'vendor', 'volunteer'], required: true },
  eventId:          { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Can be null if volunteer general payout
  amount:           { type: Number, required: true },
  fee:              { type: Number, default: 0 },
  netAmount:        { type: Number, required: true },
  status:           { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  cashfreePayoutId: { type: String },
  upiId:            { type: String },
  bankDetails: {
    bankName:      { type: String },
    accountNumber: { type: String },
    ifscCode:      { type: String }
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Payout', payoutSchema)
