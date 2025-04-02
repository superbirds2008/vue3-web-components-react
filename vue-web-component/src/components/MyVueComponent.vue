<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  message: String,
});

const emit = defineEmits(["sendMessage"]);

const handleClick = () => {
  emit("vue-event", "这是来自子组件的消息");
};
</script>

<template>
  <div style="border: 2px solid blue; padding: 10px;">
    <h3>Vue3 组件</h3>
    <p>{{ message }}</p>
    <button @click="handleClick">发送消息到父组件</button>
  </div>
</template>