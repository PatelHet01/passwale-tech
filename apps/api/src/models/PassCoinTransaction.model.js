const mongoose = require('mongoose')

const passCoinTransactionSchema = new mongoose.Schema({
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:           { type: String, enum: ['earn', 'redeem', 'expire', 'gift'], required: true },
  amount:         { type: Number, required: true }, // positive or negative
  balance:        { type: Number, required: true }, // running balance after this transaction
  referenceId:    { type: mongoose.Schema.Types.ObjectId }, // reference to Ticket or Transaction or Event
  referenceType:  { type: String, enum: ['Event', 'Ticket', 'Transaction', 'User', 'Manual'] },
  expiresAt:      { type: Date },
  multiplierUsed: { type: Number, default: 1 }
}, {
  timestamps: true
})

module.exports = mongoose.model('PassCoinTransaction', passCoinTransactionSchema)
