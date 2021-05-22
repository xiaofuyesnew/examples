<template>
  <Hello name="Vite User" />
</template>

<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import Hello from '../components/Hello.vue'

export default {
  components: {
    Hello
  }
}
</script>