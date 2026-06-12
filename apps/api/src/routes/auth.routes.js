const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const JWT_SECRET = process.env.JWT_SECRET || 'passwale_jwt_super_secret_key_123'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'passwale_jwt_refresh_super_secret_key_123'

// Helper to generate tokens
function generateTokens(user) {
  const payload = { id: user._id, email: user.email, roles: user.roles }
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  const refreshToken = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return { accessToken, refreshToken }
}

// POST /api/auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { name, email, phone, password, roles, scenePreferences } = req.body
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: { code: 'USER_EXISTS', message: 'User with this email or phone already exists' }
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    
    const user = new User({
      name,
      email,
      phone,
      passwordHash,
      roles: roles || ['attendee'],
      activeRole: roles ? roles[0] : 'attendee',
      scenePreferences: scenePreferences || [],
      emailVerified: false,
      phoneVerified: false
    })

    await user.save()

    const { accessToken, refreshToken } = generateTokens(user)
    
    // Return user without password
    const userResponse = user.toObject()
    delete userResponse.passwordHash

    return res.status(201).json({
      success: true,
      data: { user: userResponse, token: accessToken, refreshToken }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }
      })
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        error: { code: 'USER_BLOCKED', message: user.blockReason || 'User account is blocked' }
      })
    }

    user.lastLoginAt = new Date()
    await user.save()

    const { accessToken, refreshToken } = generateTokens(user)

    const userResponse = user.toObject()
    delete userResponse.passwordHash

    return res.json({
      success: true,
      data: { user: userResponse, token: accessToken, refreshToken }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res, next) => {
  try {
    const { phone } = req.body
    console.log(`Sending mock SMS OTP to phone: ${phone}`)
    // In MVP sandbox, always succeed with mock 123456 OTP
    return res.json({
      success: true,
      data: { message: 'OTP sent successfully (Mock mode: use 123456)' }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res, next) => {
  try {
    const { phone, otp } = req.body
    if (otp !== '123456') {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_OTP', message: 'Invalid OTP' }
      })
    }

    let user = await User.findOne({ phone })
    if (!user) {
      // Auto-signup on OTP
      user = new User({
        name: `User_${phone.slice(-4)}`,
        phone,
        roles: ['attendee'],
        activeRole: 'attendee',
        phoneVerified: true
      })
      await user.save()
    } else {
      user.phoneVerified = true
      await user.save()
    }

    const { accessToken, refreshToken } = generateTokens(user)
    const userResponse = user.toObject()
    delete userResponse.passwordHash

    return res.json({
      success: true,
      data: { user: userResponse, token: accessToken, refreshToken }
    })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/refresh-token
router.post('/refresh-token', async (req, res, next) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: { code: 'REFRESH_TOKEN_REQUIRED', message: 'Refresh token is required' }
      })
    }

    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_REFRESH_TOKEN', message: 'Invalid or expired refresh token' }
        })
      }

      const user = await User.findById(decoded.id)
      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User not found' }
        })
      }

      const tokens = generateTokens(user)
      return res.json({
        success: true,
        data: { token: tokens.accessToken, refreshToken: tokens.refreshToken }
      })
    })
  } catch (err) {
    next(err)
  }
})

// GET /api/auth/me (Protected)
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Access token is required' }
      })
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_TOKEN', message: 'Invalid access token' }
        })
      }

      const user = await User.findById(decoded.id)
      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User not found' }
        })
      }

      const userResponse = user.toObject()
      delete userResponse.passwordHash

      return res.json({
        success: true,
        data: { user: userResponse }
      })
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
