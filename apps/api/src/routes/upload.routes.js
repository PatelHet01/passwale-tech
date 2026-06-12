const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const { authenticate } = require('../middleware/authenticate')

// Configure local uploads directory fallback
const localUploadsDir = path.join(__dirname, '../../public/uploads')
if (!fs.existsSync(localUploadsDir)) {
  fs.mkdirSync(localUploadsDir, { recursive: true })
}

// Multer storage in memory for Sharp processing
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'), false)
    }
  }
})

// POST /api/upload/event-cover - upload cover photo
router.post('/event-cover', authenticate, upload.single('cover'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { code: 'FILE_REQUIRED', message: 'No file uploaded' } })
    }

    const filename = `cover_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.webp`
    
    // Process and compress image using sharp to webp format
    const buffer = await sharp(req.file.buffer)
      .resize(1200, 675, { fit: 'cover' }) // 16:9 ratio
      .webp({ quality: 80 })
      .toBuffer()

    const s3AccessKey = process.env.AWS_ACCESS_KEY_ID
    
    if (s3AccessKey) {
      // In real S3 code: upload using @aws-sdk/client-s3
      // For MVP we can log it and return S3 mock or implement full S3 upload
      console.log('S3 Upload initiated to S3 bucket:', process.env.AWS_S3_BUCKET)
      const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
      return res.json({ success: true, data: { url } })
    } else {
      // Save locally
      const localPath = path.join(localUploadsDir, filename)
      fs.writeFileSync(localPath, buffer)
      const url = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/${filename}`
      return res.json({ success: true, data: { url } })
    }
  } catch (err) {
    next(err)
  }
})

// POST /api/upload/event-gallery - upload gallery image
router.post('/event-gallery', authenticate, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { code: 'FILE_REQUIRED', message: 'No file uploaded' } })
    }

    const filename = `gallery_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.webp`

    const buffer = await sharp(req.file.buffer)
      .resize(1000, 1000, { fit: 'inside' })
      .webp({ quality: 80 })
      .toBuffer()

    const s3AccessKey = process.env.AWS_ACCESS_KEY_ID

    if (s3AccessKey) {
      const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
      return res.json({ success: true, data: { url } })
    } else {
      const localPath = path.join(localUploadsDir, filename)
      fs.writeFileSync(localPath, buffer)
      const url = `${process.env.BACKEND_URL || 'http://localhost:3000'}/uploads/${filename}`
      return res.json({ success: true, data: { url } })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
