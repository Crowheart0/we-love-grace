<template>
  <div class="login-form">
    <h2>欢迎来到 Grace 的留言板</h2>
    <p>请先输入您的用户名</p>
    <input 
      v-model="username" 
      type="text" 
      placeholder="用户名" 
      @keyup.enter="handleLogin"
      required
    >
    <button @click="handleLogin">登录</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'LoginForm',
  emits: ['login'],
  setup(props, { emit }) {
    const username = ref('')
    
    const handleLogin = () => {
      if (username.value.trim() !== '') {
        emit('login', username.value.trim())
        username.value = ''
      } else {
        alert('请输入用户名')
      }
    }
    
    return {
      username,
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

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #b19cd9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #9d7bd8;
}
</style>