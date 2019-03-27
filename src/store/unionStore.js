import { getData } from '@/helper/data_getters'

const unionState = {
  UNIONS: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  }
}

const unionGetters = {
  getUnions (state) {
    return state.UNIONS.data
  },
  getEditUnions (state) {
    return state.UNIONS.edit
  },
  newUnion (state) {
    return state.UNIONS.create
  },
  getIdUnions (state) {
    return state.UNIONS.id
  },
  getDeleteUnions (state) {
    return state.UNIONS.delete
  }
}

const unionMutations = {
  setUnions (state, payload) {
    state.UNIONS.data = payload
  },
  setEditUnions (state, payload) {
    state.UNIONS.edit = payload
  },
  setNewUnions (state, payload) {
    state.UNIONS.create = payload
  },
  setIdUnions (state, payload) {
    state.UNIONS.id = payload
  },
  setDeleteUnions (state, payload) {
    state.UNIONS.delete = payload
  }
}

const unionActions = {
  getDataUnions (context) {
    getData('unions').then((res) => {
      context.commit('setUnions', res)
    })
  }
}

export { unionState, unionGetters, unionMutations, unionActions }
