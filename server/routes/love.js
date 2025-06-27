const express = require('express')
const router = express.Router()
const Love = require('../models/Love')

// 获取爱心计数
router.get('/count', async (req, res) => {
  try {
    let love = await Love.findOne()
    
    // 如果没有记录，创建一个
    if (!love) {
      love = await Love.create({ count: 0 })
    }
    
    res.json({ count: love.count })
  } catch (error) {
    console.error('获取爱心计数失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

// 增加爱心计数
router.post('/increment', async (req, res) => {
  try {
    let love = await Love.findOne()
    
    if (!love) {
      love = await Love.create({ count: 1 })
    } else {
      love.count += 1
      await love.save()
    }
    
    res.json({ count: love.count })
  } catch (error) {
    console.error('增加爱心计数失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

module.exports = router