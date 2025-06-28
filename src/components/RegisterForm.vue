<template>
  <div class="register-form">
    <h2>注册新用户</h2>
    <p>请输入您的用户名进行注册</p>
    <input 
      v-model="username" 
      type="text" 
      placeholder="用户名（2-50个字符）" 
      @keyup.enter="handleRegister"
      :disabled="isLoading"
      required
    >
    <div class="button-group">
      <button @click="handleRegister" :disabled="isLoading">
        {{ isLoading ? '注册中...' : '注册' }}
      </button>
      <button @click="$emit('switch-to-login')" class="secondary">
        已有账号？去登录
      </button>
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { registerUser } from '../services/api.js'

export default {
  name: 'RegisterForm',
  emits: ['register-success', 'switch-to-login'],
  setup(props, { emit }) {
    const username = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    
    const handleRegister = async () => {
      if (username.value.trim().length < 2) {
        errorMessage.value = '用户名至少需要2个字符'
        return
      }
      
      isLoading.value = true
      errorMessage.value = ''
      
      try {
        const result = await registerUser(username.value.trim())
        emit('register-success', result.user)
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
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-form {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

.register-form h2 {
  color: #e91e63;
  margin-bottom: 10px;
}

.register-form input {
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

.register-form button {
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

.register-form button:hover:not(:disabled) {
  background-color: #c2185b;
}

.register-form button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.register-form button.secondary {
  background-color: #666;
}

.register-form button.secondary:hover:not(:disabled) {
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