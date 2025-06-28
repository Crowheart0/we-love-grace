<template>
  <div class="emoji-picker">
    <span 
      v-for="emoji in emojis" 
      :key="emoji"
      class="emoji"
      @click="selectEmoji(emoji)"
    >
      {{ emoji }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'EmojiPicker',
  emits: ['emoji-selected'],
  data() {
    return {
      emojis: ['😊', '❤️', '👍', '🎉', '🌹', '🥰', '😍', '🤗', '🐟']
    }
  },
  methods: {
    selectEmoji(emoji) {
      this.$emit('emoji-selected', emoji)
    }
  }
}
</script>

<style scoped>
.emoji-picker {
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0;
}

.emoji {
  font-size: 24px;
  cursor: pointer;
  margin: 5px;
  display: inline-block;
  transition: transform 0.2s ease;
}

.emoji:hover {
  transform: scale(1.2);
}
</style>