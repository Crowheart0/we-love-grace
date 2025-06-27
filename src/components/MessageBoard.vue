<template>
  <div class="message-board">
    <h2>Grace 的留言板</h2>
    <div class="comment-form">
      <textarea 
        v-model="commentText" 
        placeholder="写下你的留言..."
      ></textarea>
      
      <div class="media-buttons">
        <button @click="toggleEmojiPicker">添加表情</button>
        <input 
          ref="mediaInput" 
          type="file" 
          accept="image/*,video/*" 
          @change="handleMediaSelect"
          style="display:none"
        >
        <button @click="selectMedia">添加图片/视频</button>
      </div>
      
      <EmojiPicker 
        v-if="showEmojiPicker" 
        @emoji-selected="addEmoji"
      />
      
      <div v-if="selectedFile" class="media-preview">
        <img v-if="isImage" :src="mediaPreview" alt="预览" />
        <video v-else-if="isVideo" :src="mediaPreview" controls></video>
        <button @click="removeMedia" class="remove-media">移除</button>
      </div>
      
      <button @click="postComment" class="post-button">发布留言</button>
    </div>
    
    <div class="comments-container">
      <CommentItem 
        v-for="comment in comments" 
        :key="comment._id || comment.timestamp"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import CommentItem from './CommentItem.vue'
import EmojiPicker from './EmojiPicker.vue'
import { getComments, postComment } from '../services/api.js'

export default {
  name: 'MessageBoard',
  components: {
    CommentItem,
    EmojiPicker
  },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const commentText = ref('')
    const comments = ref([])
    const showEmojiPicker = ref(false)
    const selectedFile = ref(null)
    const mediaPreview = ref('')
    const mediaInput = ref(null)
    
    const isImage = computed(() => {
      return selectedFile.value && selectedFile.value.type.startsWith('image/')
    })
    
    const isVideo = computed(() => {
      return selectedFile.value && selectedFile.value.type.startsWith('video/')
    })
    
    const loadComments = async () => {
      try {
        const data = await getComments()
        comments.value = data
      } catch (error) {
        console.error('加载留言失败:', error)
      }
    }
    
    const toggleEmojiPicker = () => {
      showEmojiPicker.value = !showEmojiPicker.value
    }
    
    const addEmoji = (emoji) => {
      commentText.value += emoji
      showEmojiPicker.value = false
    }
    
    const selectMedia = () => {
      mediaInput.value.click()
    }
    
    const handleMediaSelect = (event) => {
      const file = event.target.files[0]
      if (!file) return
      
      // 文件大小限制
      if (file.type.startsWith('image/') && file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB')
        return
      }
      
      if (file.type.startsWith('video/') && file.size > 20 * 1024 * 1024) {
        alert('视频大小不能超过20MB')
        return
      }
      
      selectedFile.value = file
      
      // 创建预览
      const reader = new FileReader()
      reader.onload = (e) => {
        mediaPreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
    
    const removeMedia = () => {
      selectedFile.value = null
      mediaPreview.value = ''
      mediaInput.value.value = ''
    }
    
    const postCommentHandler = async () => {
      if (!commentText.value.trim() && !selectedFile.value) {
        alert('请输入留言内容或添加媒体文件')
        return
      }
      
      try {
        await postComment({
          username: props.user,
          content: commentText.value.trim(),
          media: selectedFile.value
        })
        
        // 重置表单
        commentText.value = ''
        removeMedia()
        
        // 重新加载留言
        await loadComments()
      } catch (error) {
        console.error('发布留言失败:', error)
        alert('发布留言失败，请重试')
      }
    }
    
    onMounted(() => {
      loadComments()
    })
    
    return {
      commentText,
      comments,
      showEmojiPicker,
      selectedFile,
      mediaPreview,
      mediaInput,
      isImage,
      isVideo,
      toggleEmojiPicker,
      addEmoji,
      selectMedia,
      handleMediaSelect,
      removeMedia,
      postComment: postCommentHandler
    }
  }
}
</script>

<style scoped>
.message-board {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  text-align: left;
}

textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
}

.media-buttons {
  margin: 10px 0;
}

.media-buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.media-preview {
  margin: 10px 0;
  position: relative;
}

.media-preview img,
.media-preview video {
  max-width: 100%;
  max-height: 200px;
  border-radius: 5px;
}

.remove-media {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  cursor: pointer;
}

.post-button {
  background-color: #b19cd9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.post-button:hover {
  background-color: #9d7bd8;
}

.comments-container {
  margin-top: 20px;
}
</style>