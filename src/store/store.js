import Vue from 'vue'
import Vuex from 'vuex'

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
    // FEATHER_URL: 'http://192.168.0.9:6060/',
    FEATHER_URL: 'http://localhost:6060/',
    // FEATHER_URL: 'http://adnews-back.f34th3r.io/', //! online server
    LOADING: false,
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
