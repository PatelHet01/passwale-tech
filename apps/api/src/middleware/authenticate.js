const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

const JWT_SECRET = process.env.JWT_SECRET || 'passwale_jwt_super_secret_key_123'

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
      })
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: { code: 'INVALID_TOKEN', message: 'Token is invalid or expired' }
        })
      }

      const user = await User.findById(decoded.id)
      if (!user) {
        return res.status(404).json({
          success: false,
          error: { code: 'USER_NOT_FOUND', message: 'User not found' }
        })
      }

      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          error: { code: 'USER_BLOCKED', message: user.blockReason || 'User account is blocked' }
        })
      }

      req.user = user
      next()
    })
  } catch (err) {
    next(err)
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
      })
    }

    const hasRole = req.user.roles.some(r => roles.includes(r))
    if (!hasRole) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Access denied: insufficient permissions' }
      })
    }

    next()
  }
}

module.exports = { authenticate, authorize }
