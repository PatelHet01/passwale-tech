const mongoose = require('mongoose')

const commissionTierSchema = new mongoose.Schema({
  name: String,
  minGMV: Number,
  maxGMV: Number,
  rate: Number,
}, { _id: false })

const adminSettingsSchema = new mongoose.Schema({
  platformFee: { type: Number, default: 3.69 },
  commissionTiers: {
    type: [commissionTierSchema],
    default: [
      { name: 'Starter', minGMV: 0,         maxGMV: 100000,    rate: 15 },
      { name: 'Growth',  minGMV: 100001,     maxGMV: 500000,    rate: 12 },
      { name: 'Scale',   minGMV: 500001,     maxGMV: 2000000,   rate: 10 },
      { name: 'Pro',     minGMV: 2000001,    maxGMV: 10000000,  rate: 8  },
      { name: 'Elite',   minGMV: 10000001,   maxGMV: 999999999, rate: 5  },
    ],
  },
  volunteerFeePercent: { type: Number, default: 5 },
  vendorCommissionPercent: { type: Number, default: 8 },
  cardPricing: {
    plus:  { monthly: { type: Number, default: 199  }, annual: { type: Number, default: 1999  } },
    pro:   { monthly: { type: Number, default: 599  }, annual: { type: Number, default: 5999  } },
  },
  cardSubsidy: {
    platformPercent:   { type: Number, default: 60 },
    organizerPercent:  { type: Number, default: 40 },
  },
  resaleFees: {
    standard:   { type: Number, default: 100 },
    priority:   { type: Number, default: 199 },
    guaranteed: { type: Number, default: 299 },
  },
  passCoinConfig: {
    earningRate: {
      free:  { type: Number, default: 1 },
      plus:  { type: Number, default: 2 },
      pro:   { type: Number, default: 3 },
      black: { type: Number, default: 5 },
    },
    coinsPerRupee: { type: Number, default: 0.1 },  // 0.1 coin per ₹1 spent (× tier multiplier)
    redeemRate:    { type: Number, default: 10 },    // 10 coins = ₹1
    expiryDays: {
      free:  { type: Number, default: 90  },
      plus:  { type: Number, default: 180 },
      pro:   { type: Number, default: 365 },
      black: { type: Number, default: 730 },
    },
  },
  features: {
    scenesEnabled:             { type: Boolean, default: true },
    squadPassesEnabled:        { type: Boolean, default: true },
    volunteerMarketplace:      { type: Boolean, default: false },
    vendorSystem:              { type: Boolean, default: false },
    eventApprovalRequired:     { type: Boolean, default: false },
    autoApproveVerifiedOrgs:   { type: Boolean, default: true },
    maxTicketPrice:            { type: Number, default: 50000 },
  },
  cashfreeEnv: { type: String, enum: ['sandbox', 'production'], default: 'sandbox' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

// Singleton pattern
adminSettingsSchema.statics.getInstance = async function () {
  let settings = await this.findOne()
  if (!settings) settings = await this.create({})
  return settings
}

module.exports = mongoose.model('AdminSettings', adminSettingsSchema)
