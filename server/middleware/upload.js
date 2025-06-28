const multer = require('multer')
const path = require('path')
const fs = require('fs-extra')

// 确保上传目录存在
const uploadDir = process.env.UPLOAD_PATH || './uploads'
fs.ensureDirSync(uploadDir)
fs.ensureDirSync(path.join(uploadDir, 'images'))
fs.ensureDirSync(path.join(uploadDir, 'videos'))

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = 'images'
    if (file.mimetype.startsWith('video/')) {
      folder = 'videos'
    }
    cb(null, path.join(uploadDir, folder))
  },
  filename: (req, file, cb) => {
    // 生成唯一文件名
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  }
})

// 文件过滤器
const fileFilter = (req, file, cb) => {
  // 检查文件类型
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true)
  } else {
    cb(new Error('只允许上传图片和视频文件'), false)
  }
}

// 配置multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 20 * 1024 * 1024 // 20MB
  },
  fileFilter: fileFilter
})

module.exports = upload