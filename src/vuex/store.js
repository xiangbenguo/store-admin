import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isLogin: false
}

const mutations = {
  login (state) {
    state.isLogin = true
  },
  logout (state) {
    window.localStorage.clear()
    state.isLogin = false
  }
}
export default new Vuex.Store({
  state: state,
  mutations: mutations
})
