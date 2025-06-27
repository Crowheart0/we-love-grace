const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const upload = require('../middleware/upload')
const path = require('path')

// 获取所有留言
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      order: [['timestamp', 'DESC']]
    })
    
    res.json(comments)
  } catch (error) {
    console.error('获取留言失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 发布新留言
router.post('/', upload.single('media'), async (req, res) => {
  try {
    const { username, content } = req.body
    
    // 验证必填字段
    if (!username || (!content && !req.file)) {
      return res.status(400).json({ error: '用户名和内容不能为空' })
    }
    
    const commentData = {
      username,
      content: content || '',
      timestamp: new Date()
    }
    
    // 处理上传的媒体文件
    if (req.file) {
      const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video'
      const mediaUrl = `/uploads/${mediaType === 'image' ? 'images' : 'videos'}/${req.file.filename}`
      
      commentData.mediaUrl = mediaUrl
      commentData.mediaType = mediaType
    }
    
    const comment = await Comment.create(commentData)
    
    res.status(201).json({
      success: true,
      comment: comment
    })
  } catch (error) {
    console.error('发布留言失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 删除留言（可选功能）
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    const comment = await Comment.findByPk(id)
    if (!comment) {
      return res.status(404).json({ error: '留言不存在' })
    }
    
    await comment.destroy()
    
    res.json({ success: true, message: '留言已删除' })
  } catch (error) {
    console.error('删除留言失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

module.exports = router