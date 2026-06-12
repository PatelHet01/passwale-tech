require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
const httpServer = createServer(app)

// Socket.io
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || 'http://localhost:5173', methods: ['GET', 'POST'] },
})
app.set('io', io)

// Middleware
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

// Routes
app.use('/api/auth', require('./src/routes/auth.routes'))
app.use('/api/admin', require('./src/routes/admin.routes'))
app.use('/api/events', require('./src/routes/events.routes'))
app.use('/api/scenes', require('./src/routes/scenes.routes'))
app.use('/api/tickets', require('./src/routes/tickets.routes'))
app.use('/api/pricing', require('./src/routes/pricing.routes'))
app.use('/api/subscriptions', require('./src/routes/subscriptions.routes'))
app.use('/api/squads', require('./src/routes/squads.routes'))
app.use('/api/notifications', require('./src/routes/notifications.routes'))
app.use('/api/upload', require('./src/routes/upload.routes'))
app.use('/api/organizer', require('./src/routes/organizer.routes'))
app.use('/api/webhooks', require('./src/routes/webhooks.routes'))

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// 404
app.use((req, res) => res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} not found` } }))

// Global error handler
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || err.statusCode || 500
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Something went wrong',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  })
})

// Socket handlers
io.on('connection', (socket) => {
  socket.on('join-event-room', (eventId) => socket.join(`event:${eventId}`))
  socket.on('join-squad-room', (squadId) => socket.join(`squad:${squadId}`))
  socket.on('leave-event-room', (eventId) => socket.leave(`event:${eventId}`))
  socket.on('send-message', async ({ eventId, message }) => {
    io.to(`event:${eventId}`).emit('new-message', message)
  })
  socket.on('poll-vote', ({ pollId, optionId, eventId }) => {
    io.to(`event:${eventId}`).emit('poll-updated', { pollId, optionId })
  })
})

// Start
const PORT = process.env.PORT || 3000

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passwale')
    console.log('✅ MongoDB connected')

    // Start cron jobs
    require('./src/jobs/scene-stats.job')
    require('./src/jobs/squad-cleanup.job')
    require('./src/jobs/subscription-check.job')

    httpServer.listen(PORT, () => {
      console.log(`🚀 Passwale API running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to start:', err)
    process.exit(1)
  }
}

start()

module.exports = { app, io }
