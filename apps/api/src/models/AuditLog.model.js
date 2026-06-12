const mongoose = require('mongoose')

const auditLogSchema = new mongoose.Schema({
  adminId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action:     { type: String, required: true },
  targetType: { type: String, required: true }, // e.g. 'User', 'Event', 'AdminSettings'
  targetId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  before:     { type: mongoose.Schema.Types.Mixed },
  after:      { type: mongoose.Schema.Types.Mixed },
  ip:         { type: String },
  userAgent:  { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('AuditLog', auditLogSchema)
