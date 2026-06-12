const mongoose = require('mongoose')

const refundSchema = new mongoose.Schema({
  transactionId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  ticketIds:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reason:          { type: String },
  amount:          { type: Number, required: true },
  status:          { type: String, enum: ['pending', 'approved', 'rejected', 'processed'], default: 'pending' },
  adminNote:       { type: String },
  cashfreeRefundId:{ type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('Refund', refundSchema)
