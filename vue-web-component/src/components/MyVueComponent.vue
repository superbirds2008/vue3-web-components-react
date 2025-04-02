<script setup>
import { defineProps } from "vue";

defineProps({
  message: String,
});
</script>

<template>
  <div style="border: 2px solid blue; padding: 10px;">
    <h3>Vue3 组件</h3>
    <p>{{ message }}</p>
  </div>
</template>