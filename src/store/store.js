import Vue from 'vue'
import Vuex from 'vuex'

import { getLocalUser } from '@/helper/auth'

//! Stores
import { authState, authMutations, authActions } from '@/store/auth/authStore'
import { unionState, unionGetters, unionMutations, unionActions } from '@/store/unionStore'
import { groupState, groupGetters, groupMutations, groupActions } from '@/store/groupStore'

const user = getLocalUser()
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    USER: user,
    ...authState,
    ...unionState,
    ...groupState
  },
  getters: {
    getCurrentUser (state) {
      return state.USER
    },
    ...unionGetters,
    ...groupGetters
  },
  mutations: {
    ...authMutations,
    ...unionMutations,
    ...groupMutations
  },
  actions: {
    ...authActions,
    ...unionActions,
    ...groupActions
  }
})
