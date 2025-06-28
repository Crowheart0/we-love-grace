<template>
  <div class="login-form">
    <h2>欢迎来到 Grace 的留言板</h2>
    <p>请输入您的用户名登录</p>
    <input 
      v-model="username" 
      type="text" 
      placeholder="用户名" 
      @keyup.enter="handleLogin"
      :disabled="isLoading"
      required
    >
    <div class="button-group">
      <button @click="handleLogin" :disabled="isLoading">
        {{ isLoading ? '登录中...' : '登录' }}
      </button>
      <button @click="$emit('switch-to-register')" class="secondary">
        没有账号？去注册
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { loginUser } from '../services/api.js'

export default {
  name: 'LoginForm',
  emits: ['login', 'switch-to-register'],
  setup(props, { emit }) {
    const username = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    
    const handleLogin = async () => {
      if (username.value.trim() === '') {
        errorMessage.value = '请输入用户名'
        return
      }
      
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        const result = await loginUser(username.value.trim())
        emit('login', result.user.username)
        username.value = ''
      } catch (error) {
        errorMessage.value = error.message
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      username,
      isLoading,
      errorMessage,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-form {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.login-form h2 {
  color: #e91e63;
  margin-bottom: 10px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #e91e63;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.login-form button {
  flex: 1;
  padding: 10px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover:not(:disabled) {
  background-color: #c2185b;
}

.login-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-form button.secondary {
  background-color: #666;
}

.login-form button.secondary:hover:not(:disabled) {
  background-color: #555;
}

.error-message {
  color: #f44336;
  margin-top: 10px;
  padding: 8px;
  background-color: #ffebee;
  border-radius: 4px;
  border-left: 4px solid #f44336;
}
</style>