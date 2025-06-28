const express = require('express')
const User = require('../models/User')
const router = express.Router()

// 用户注册
router.post('/register', async (req, res) => {
  try {
    const { username } = req.body
    
    if (!username || username.trim().length < 2) {
      return res.status(400).json({ error: '用户名至少需要2个字符' })
    }
    
    // 检查用户名是否已存在
    const existingUser = await User.findOne({ where: { username: username.trim() } })
    if (existingUser) {
      return res.status(409).json({ error: '用户名已存在' })
    }
    
    // 创建新用户
    const user = await User.create({ username: username.trim() })
    
    res.status(201).json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username
      }
    })
  } catch (error) {
    console.error('用户注册失败:', error)
    res.status(500).json({ error: '注册失败，请稍后重试' })
  }
})

// 用户登录（验证用户名是否存在）
router.post('/login', async (req, res) => {
  try {
    const { username } = req.body
    
    if (!username || username.trim().length === 0) {
      return res.status(400).json({ error: '请输入用户名' })
    }
    
    // 检查用户是否存在
    const user = await User.findOne({ where: { username: username.trim() } })
    if (!user) {
      return res.status(404).json({ error: '用户不存在，请先注册' })
    }
    
    res.json({
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username
      }
    })
  } catch (error) {
    console.error('用户登录失败:', error)
    res.status(500).json({ error: '登录失败，请稍后重试' })
  }
})

// 获取所有用户（可选，用于管理）
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'createdAt'],
      order: [['createdAt', 'DESC']]
    })
    res.json(users)
  } catch (error) {
    console.error('获取用户列表失败:', error)
    res.status(500).json({ error: '获取用户列表失败' })
  }
})

module.exports = router