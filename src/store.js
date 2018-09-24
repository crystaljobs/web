import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const storage = window.localStorage

let id = storage.getItem('id')
let jwt = storage.getItem('jwt')

export default new Vuex.Store({
  state: {
    id: id,
    jwt: jwt
  },
  mutations: {
    setID (state, payload) {
      state.id = payload

      if (payload) storage.setItem('id', payload)
      else storage.removeItem('id')
    },
    setJWT (state, payload) {
      state.jwt = payload
      if (payload) storage.setItem('jwt', payload)
      else storage.removeItem('jwt')
    }
  },
  actions: {
    logOut (context) {
      context.commit('setID', null)
      context.commit('setJWT', null)
    }
  },
  getters: {
    loggedIn (state) {
      return state.id
    }
  }
})
