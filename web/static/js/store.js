import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  lists: [],
  socket: null,
  listChannel: null,
  todoChannel: null
}

const mutations = {
  addSocket (state, socket) {
    socket.connect
    state.socket = socket
    listChannel.connect(socket, state)
  }
}

const actions = {
}

// getters are functions
const getters = {
}

let listChannel = {
  connect(socket, state) {
    let channel = socket.channel("lists")
    channel.join()
      .receive('ok', resp => {
        state.listChannel = channel
        handleChannelResponse.forList(channel, state)
        this.listsIndex(channel)
      })
      .receive('error', reason => {
        console.log('Error joining channel: ', reason)
      })
  },
  listsIndex(channel) {
    channel.push("index", {})
  }

}

let handleChannelResponse = {
  forList(channel, state) {
    channel.on("index", resp => {
      state.lists = resp.lists
    })

    channel.on("create", resp => {
      state.lists.unshift(resp)
    })
  }
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
