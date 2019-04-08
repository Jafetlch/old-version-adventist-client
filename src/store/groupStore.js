import { getData, getDataWhitParameters } from '@/helper/data_getters'

const groupState = {
  GROUPS: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  }
}

const groupGetters = {
  getGroups (state) {
    return state.GROUPS.data
  },
  getEditGroups (state) {
    return state.GROUPS.edit
  },
  newGroups (state) {
    return state.GROUPS.create
  },
  getIdGroups (state) {
    return state.GROUPS.id
  },
  getDeleteGroups (state) {
    return state.GROUPS.delete
  }
}

const groupMutations = {
  setGroups (state, payload) {
    state.GROUPS.data = payload
  },
  setEditGroups (state, payload) {
    state.GROUPS.edit = payload
  },
  setNewGroups (state, payload) {
    state.GROUPS.create = payload
  },
  setIdGroups (state, payload) {
    state.GROUPS.id = payload
  },
  setDeleteGroups (state, payload) {
    state.GROUPS.delete = payload
  }
}

const groupActions = {
  getDataGroups (context) {
    getData('groups').then((res) => {
      context.commit('setGroups', res)
    })
  },
  getDataGroupsWithParams (context) {
    getDataWhitParameters('groups', context.getters.getCurrentUser.id).then((res) => {
      context.commit('setGroups', res)
    })
  }
}

export { groupState, groupGetters, groupMutations, groupActions }
