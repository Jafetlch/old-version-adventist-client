import Vue from 'vue'
import Vuex from 'vuex'

import { getLocalUser } from '@/helper/auth'

//! Stores
import { authState, authMutations, authActions } from '@/store/auth/authStore'
import { unionState, unionGetters, unionMutations, unionActions } from '@/store/unionStore'
import { groupState, groupGetters, groupMutations, groupActions } from '@/store/groupStore'
import { churchState, churchGetters, churchMutations, churchActions } from '@/store/churchStore'
import { departmentState, departmentGetters, departmentMutations, departmentActions } from '@/store/departmentStore'

const user = getLocalUser()
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    USER: user,
    ...authState,
    ...unionState,
    ...groupState,
    ...churchState,
    ...departmentState
  },
  getters: {
    getCurrentUser (state) {
      return state.USER
    },
    ...unionGetters,
    ...groupGetters,
    ...churchGetters,
    ...departmentGetters
  },
  mutations: {
    ...authMutations,
    ...unionMutations,
    ...groupMutations,
    ...churchMutations,
    ...departmentMutations
  },
  actions: {
    ...authActions,
    ...unionActions,
    ...groupActions,
    ...churchActions,
    ...departmentActions
  }
})
