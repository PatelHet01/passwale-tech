const mongoose = require('mongoose')

const squadMemberSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }, // assigned after squad is locked/tickets purchased
  joinedAt: { type: Date, default: Date.now }
}, { _id: false })

const squadSchema = new mongoose.Schema({
  eventId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  categoryId:   { type: mongoose.Schema.Types.ObjectId, required: true },
  creatorId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:         { type: String, required: true },
  inviteCode:   { type: String, required: true, unique: true },
  members:      [squadMemberSchema],
  minMembers:   { type: Number, required: true, default: 4 },
  maxMembers:   { type: Number, required: true, default: 10 },
  status:       { type: String, enum: ['forming', 'locked', 'cancelled'], default: 'forming' },
  lockDeadline: { type: Date, required: true },
  discount:     { type: Number, default: 0 } // discount % for squad buy-in
}, {
  timestamps: true
})

module.exports = mongoose.model('Squad', squadSchema)
