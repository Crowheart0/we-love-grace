<template>
  <div id="app">
    <div class="user-info" v-if="currentUser" @click="logout">
      欢迎, {{ currentUser }} | 点击退出
    </div>
    
    <div class="container">
      <LoveButton @love-clicked="handleLoveClick" :count="loveCount" />
      <div v-if="showLoveMessage" class="message">We Love Grace! ❤️</div>
      
      <LoginForm v-if="!currentUser" @login="handleLogin" />
      <MessageBoard v-else :user="currentUser" />
    </div>
  </div>
</template>

<script>
import LoveButton from './components/LoveButton.vue'
import LoginForm from './components/LoginForm.vue'
import MessageBoard from './components/MessageBoard.vue'
import { ref, onMounted } from 'vue'
import { incrementLove, getLoveCount } from './services/api.js'

export default {
  name: 'App',
  components: {
    LoveButton,
    LoginForm,
    MessageBoard
  },
  setup() {
    const currentUser = ref(localStorage.getItem('graceUsername'))
    const loveCount = ref(0)
    const showLoveMessage = ref(false)
    
    const loadLoveCount = async () => {
      try {
        const count = await getLoveCount()
        loveCount.value = count
      } catch (error) {
        console.error('获取爱心计数失败:', error)
      }
    }
    
    const handleLoveClick = async () => {
      try {
        const count = await incrementLove()
        loveCount.value = count
        showLoveMessage.value = !showLoveMessage.value
      } catch (error) {
        console.error('增加爱心计数失败:', error)
      }
    }
    
    const handleLogin = (username) => {
      currentUser.value = username
      localStorage.setItem('graceUsername', username)
    }
    
    const logout = () => {
      localStorage.removeItem('graceUsername')
      currentUser.value = null
    }
    
    onMounted(() => {
      loadLoveCount()
    })
    
    return {
      currentUser,
      loveCount,
      showLoveMessage,
      handleLoveClick,
      handleLogin,
      logout
    }
  }
}
</script>

<style scoped>
.user-info {
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.container {
  text-align: center;
  width: 90%;
  max-width: 800px;
}

.message {
  margin-top: 30px;
  font-size: 36px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>