const mongoose = require('mongoose')

const transactionTicketSchema = new mongoose.Schema({
  ticketId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
  categoryId: { type: mongoose.Schema.Types.ObjectId, required: true },
  basePrice:  { type: Number, required: true },
  discount:   { type: Number, default: 0 },
  subtotal:   { type: Number, required: true }
}, { _id: false })

const transactionSchema = new mongoose.Schema({
  userId:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId:          { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  tickets:          [transactionTicketSchema],
  platformFee:      { type: Number, required: true },
  totalAmount:      { type: Number, required: true },
  cashfreeOrderId:  { type: String, required: true, unique: true },
  cashfreePaymentId:{ type: String },
  status:           { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  pricingSnapshot:  { type: mongoose.Schema.Types.Mixed } // copy of AdminSettings configurations at purchase
}, {
  timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema)
