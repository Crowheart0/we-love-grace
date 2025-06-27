const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const { sequelize, testConnection } = require('./config/database')
const loveRoutes = require('./routes/love')
const commentRoutes = require('./routes/comments')

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 静态文件服务（用于访问上传的媒体文件）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API路由
app.use('/api/love', loveRoutes)
app.use('/api/comments', commentRoutes)

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Grace Love Backend is running!' })
})

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error)
  
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: '文件大小超出限制' })
    }
  }
  
  res.status(500).json({ error: '服务器内部错误' })
})

// 404处理
app.use('*', (req, res) => {
  res.status(404).json({ error: '接口不存在' })
})

// 启动服务器
const startServer = async () => {
  try {
    // 测试数据库连接
    await testConnection()
    
    // 同步数据库模型
    await sequelize.sync({ alter: true })
    console.log('✅ 数据库模型同步完成')
    
    // 启动服务器
    app.listen(PORT, () => {
      console.log(`🚀 服务器运行在 http://localhost:${PORT}`)
      console.log(`📊 健康检查: http://localhost:${PORT}/health`)
      console.log(`💝 爱心API: http://localhost:${PORT}/api/love/count`)
      console.log(`💬 留言API: http://localhost:${PORT}/api/comments`)
    })
  } catch (error) {
    console.error('❌ 服务器启动失败:', error)
    process.exit(1)
  }
}

startServer()