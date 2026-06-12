const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const sceneStatSchema = new mongoose.Schema({
  scene: { type: mongoose.Schema.Types.ObjectId, ref: 'Scene' },
  attendanceCount: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastAttendedAt: Date,
  badges: [{ name: String, awardedAt: Date }],
}, { _id: false })

const userSchema = new mongoose.Schema({
  name:         { type: String, required: true, trim: true },
  email:        { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  phone:        { type: String, unique: true, sparse: true },
  passwordHash: String,
  googleId:     String,
  profilePhoto: String,

  roles: {
    type: [String],
    enum: ['attendee', 'organizer', 'vendor', 'volunteer', 'admin', 'super_admin'],
    default: ['attendee'],
  },

  scenePreferences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Scene' }],
  sceneStats: [sceneStatSchema],

  passwaleCard: {
    tier: { type: String, enum: ['free', 'plus', 'pro', 'black'], default: 'free' },
    expiresAt: Date,
    startedAt: Date,
    totalSaved: { type: Number, default: 0 },
    earlyAccessUsed: { type: Number, default: 0 },
  },

  passCoinBalance: { type: Number, default: 0 },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  organizerProfile: {
    businessName: String,
    bio: String,
    website: String,
    socialLinks: { instagram: String, twitter: String, facebook: String },
    commissionOverride: { type: Number, default: null },  // null = use tier default
    verificationStatus: { type: String, enum: ['unverified', 'pending', 'verified', 'rejected'], default: 'unverified' },
    documents: [{ type: String, key: String, uploadedAt: Date }],
    bankDetails: { encrypted: String },
    upiId: String,
    totalGMV: { type: Number, default: 0 },
    tier: { type: String, enum: ['Starter', 'Growth', 'Scale', 'Pro', 'Elite'], default: 'Starter' },
  },

  volunteerProfile: {
    skills: [String],
    experience: String,
    availability: { type: Map, of: Boolean },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    punctualityScore: { type: Number, default: 100 },
  },

  notificationPrefs: {
    inApp:  { type: Boolean, default: true },
    email:  { type: Boolean, default: true },
    sms:    { type: Boolean, default: true },
    push:   { type: Boolean, default: true },
  },

  fcmToken: String,

  isBlocked: { type: Boolean, default: false },
  blockReason: String,
  blockedAt: Date,

  emailVerified: { type: Boolean, default: false },
  emailVerifyToken: String,
  emailVerifyExpiry: Date,

  phoneVerified: { type: Boolean, default: false },
  phoneOtp: String,
  phoneOtpExpiry: Date,
  phoneOtpAttempts: { type: Number, default: 0 },

  passwordResetToken: String,
  passwordResetExpiry: Date,

  lastLoginAt: Date,
  lastLoginIp: String,
}, { timestamps: true })

// Indexes
userSchema.index({ email: 1 })
userSchema.index({ phone: 1 })
userSchema.index({ googleId: 1 })
userSchema.index({ referralCode: 1 })
userSchema.index({ 'organizerProfile.verificationStatus': 1 })

// Auto-generate referral code
userSchema.pre('save', async function () {
  if (!this.referralCode) {
    this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase()
  }
  if (this.isModified('passwordHash') && this.passwordHash && !this.passwordHash.startsWith('$2')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
  }
})

userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash)
}

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject()
  delete obj.passwordHash
  delete obj.phoneOtp
  delete obj.emailVerifyToken
  delete obj.passwordResetToken
  delete obj.fcmToken
  return obj
}

module.exports = mongoose.model('User', userSchema)
