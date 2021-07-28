<template>
  <Hello msg="Hello, Vite User Fallow!" />
  <div>{{ num }}</div>
  <button @click="add">add</button>
</template>

<style scoped>
</style>

<script setup>
import { computed } from 'vue'
import { useStore } from "vuex";
import Hello from "../components/Hello.vue";

const store = useStore()

const num = computed(() => store.state.test)

const add = () => {
  store.commit('addTest')
}
</script>