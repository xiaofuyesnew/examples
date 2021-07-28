<template>
  <div class="wrap">
    <div class="greet">{{ msg }}</div>
  </div>
</template>

<style scoped>
</style>

<script setup>
import { defineProps } from "vue";

defineProps({
  msg: String
})
</script>

