import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  lists: [],
  socket: "pula"
}

const mutations = {
  addSocket (state, socket) {
    state.socket = socket
  },
  addLists (state, lists) {
    state.lists = lists
  }
}

const actions = {
}

// getters are functions
const getters = {
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
