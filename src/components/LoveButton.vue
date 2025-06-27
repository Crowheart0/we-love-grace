<template>
  <div>
    <button @click="handleClick" class="love-button">
      点击这里
    </button>
    <div class="counter">
      已有 {{ count }} 人表达爱意
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoveButton',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  emits: ['love-clicked'],
  methods: {
    handleClick() {
      this.$emit('love-clicked')
    }
  }
}
</script>

<style scoped>
.love-button {
  padding: 15px 30px;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.love-button:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.05);
}

.counter {
  margin-top: 15px;
  font-size: 18px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 15px;
  border-radius: 5px;
  display: inline-block;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>