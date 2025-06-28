const API_URL = '/api'

// 获取爱心计数
export async function getLoveCount() {
  try {
    const response = await fetch(`${API_URL}/love/count`)
    const data = await response.json()
    return data.count
  } catch (error) {
    console.error('获取爱心计数失败:', error)
    throw error
  }
}

// 增加爱心计数
export async function incrementLove() {
  try {
    const response = await fetch(`${API_URL}/love/increment`, {
      method: 'POST'
    })
    const data = await response.json()
    return data.count
  } catch (error) {
    console.error('增加爱心计数失败:', error)
    throw error
  }
}

// 获取留言列表
export async function getComments() {
  try {
    const response = await fetch(`${API_URL}/comments`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('获取留言失败:', error)
    throw error
  }
}

// 发布留言
export async function postComment({ username, content, media }) {
  try {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('content', content)
    
    if (media) {
      formData.append('media', media)
    }
    
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error('发布留言失败')
    }
    
    return await response.json()
  } catch (error) {
    console.error('发布留言失败:', error)
    throw error
  }
}

// 用户注册
export async function registerUser(username) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || '注册失败')
    }
    
    return data
  } catch (error) {
    console.error('用户注册失败:', error)
    throw error
  }
}

// 用户登录
export async function loginUser(username) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || '登录失败')
    }
    
    return data
  } catch (error) {
    console.error('用户登录失败:', error)
    throw error
  }
}