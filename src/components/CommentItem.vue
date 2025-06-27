<template>
  <div class="comment">
    <div class="comment-header">
      <span class="username">{{ comment.username }}</span>
      <span class="timestamp">{{ formattedDate }}</span>
    </div>
    <div class="comment-content">{{ comment.content }}</div>
    <div v-if="comment.mediaUrl" class="comment-media">
      <img v-if="comment.mediaType === 'image'" :src="comment.mediaUrl" alt="用户上传图片" />
      <video v-else-if="comment.mediaType === 'video'" :src="comment.mediaUrl" controls></video>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const formattedDate = computed(() => {
      const date = new Date(props.comment.timestamp)
      return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
    })
    
    return {
      formattedDate
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
</style>