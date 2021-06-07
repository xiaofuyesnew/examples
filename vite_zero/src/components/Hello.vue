<template>
  <div class="wrap">
    <div class="greet">Hello, {{ name }}!</div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}
</style>

<script setup>
import { defineProps, reactive } from "vue";

defineProps({
  name: {
    type: String,
    default: 'User'
  }
})
</script>

