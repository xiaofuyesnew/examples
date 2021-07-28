import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      test: 0
    }
  },
  mutations: {
    addTest(state) {
      state.test++
    }
  }
})