<template>
  <Hello name="Vite User Fallow" />
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

<script setup>
import { useStore } from "vuex";
import Hello from "../components/Hello.vue";

const store = useStore()

console.log(store.state.test)
store.commit('changeTest')
console.log(store.state.test)

</script>