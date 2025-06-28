<template>
  <div class="comment">
    <div class="comment-header">
      <span class="username">{{ comment.username }}</span>
      <span class="timestamp">{{ formattedDate }}</span>
    </div>
    <div class="comment-content">{{ comment.content }}</div>
    <div v-if="comment.mediaUrl" class="comment-media">
      <img 
        v-if="comment.mediaType === 'image'" 
        :src="comment.mediaUrl" 
        alt="用户上传图片" 
        @click="openImageModal"
        class="clickable-image"
      />
      <video v-else-if="comment.mediaType === 'video'" :src="comment.mediaUrl" controls></video>
    </div>
    
    <!-- 图片大图模态框 -->
    <div v-if="showImageModal" class="image-modal" @click="closeImageModal">
      <div class="modal-content" @click.stop>
        <span class="close-button" @click="closeImageModal">&times;</span>
        <img :src="comment.mediaUrl" alt="大图预览" class="modal-image" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const showImageModal = ref(false)
    
    const formattedDate = computed(() => {
      const date = new Date(props.comment.timestamp)
      return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    })
    
    const openImageModal = () => {
      showImageModal.value = true
    }
    
    const closeImageModal = () => {
      showImageModal.value = false
    }
    
    return {
      formattedDate,
      showImageModal,
      openImageModal,
      closeImageModal
    }
  }
}
</script>

<style scoped>
.comment {
  background-color: rgba(255, 255, 255, 0.8);
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  border-left: 5px solid #b19cd9;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.username {
  color: #b19cd9;
}

.timestamp {
  color: #666;
  font-size: 14px;
}

.comment-content {
  margin-bottom: 10px;
  line-height: 1.5;
}

.comment-media img,
.comment-media video {
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
  border-radius: 5px;
}

.clickable-image {
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.clickable-image:hover {
  opacity: 0.8;
}

/* 模态框样式 */
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
  z-index: 1001;
}

.close-button:hover {
  color: #000;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 5px;
}
</style>