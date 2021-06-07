import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      test: '111'
    }
  },
  mutations: {
    changeTest(state) {
      state.test = '222'
    }
  }
})