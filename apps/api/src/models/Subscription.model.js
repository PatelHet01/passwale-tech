const mongoose = require('mongoose')

const billingHistorySchema = new mongoose.Schema({
  date:       { type: Date, required: true },
  amount:     { type: Number, required: true },
  invoiceUrl: { type: String }
}, { _id: false })

const subscriptionSchema = new mongoose.Schema({
  userId:                 { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tier:                   { type: String, enum: ['free', 'plus', 'pro', 'black'], default: 'free' },
  cashfreeSubscriptionId: { type: String },
  status:                 { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
  startedAt:              { type: Date, default: Date.now },
  expiresAt:              { type: Date, required: true },
  autoRenew:              { type: Boolean, default: true },
  billingHistory:         [billingHistorySchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Subscription', subscriptionSchema)
