import Vue from 'vue'
import Vuex from 'vuex'

import URL from '@/helper/url'
import { getLocalUser } from '@/helper/auth'

//! Stores
import { authState, authMutations, authActions } from '@/store/auth/authStore'
import { unionState, unionGetters, unionMutations, unionActions } from '@/store/unionStore'
import { groupState, groupGetters, groupMutations, groupActions } from '@/store/groupStore'
import { churchState, churchGetters, churchMutations, churchActions } from '@/store/churchStore'
import { departmentState, departmentGetters, departmentMutations, departmentActions } from '@/store/departmentStore'
import { advertisementState, advertisementGetters, advertisementMutations, advertisementActions } from '@/store/advertisementStore'

const user = getLocalUser()
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    FEATHER_URL: URL.server,
    LOADING: false,
    VERSION: 'Beta-v 0.6',
    USER: user,
    ...authState,
    ...unionState,
    ...groupState,
    ...churchState,
    ...departmentState,
    ...advertisementState
  },
  getters: {
    getCurrentUser (state) {
      return state.USER
    },
    getFeatherUrl (state) {
      return state.FEATHER_URL
    },
    getCurrentVersion (state) {
      return state.VERSION
    },
    ...unionGetters,
    ...groupGetters,
    ...churchGetters,
    ...departmentGetters,
    ...advertisementGetters
  },
  mutations: {
    ...authMutations,
    ...unionMutations,
    ...groupMutations,
    ...churchMutations,
    ...departmentMutations,
    ...advertisementMutations
  },
  actions: {
    ...authActions,
    ...unionActions,
    ...groupActions,
    ...churchActions,
    ...departmentActions,
    ...advertisementActions
  }
})
