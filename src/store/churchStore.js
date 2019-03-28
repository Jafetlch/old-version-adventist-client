import { getData, getDataWhitParameters } from '@/helper/data_getters'

const churchState = {
  CHURCH: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  }
}

const churchGetters = {
  getChurches (state) {
    return state.CHURCH.data
  },
  getEditChurches (state) {
    return state.CHURCH.edit
  },
  newChurches (state) {
    return state.CHURCH.create
  },
  getIdChurches (state) {
    return state.CHURCH.id
  },
  getDeleteChurches (state) {
    return state.CHURCH.delete
  }
}

const churchMutations = {
  setChurches (state, payload) {
    state.CHURCH.data = payload
  },
  setEditChurches (state, payload) {
    state.CHURCH.edit = payload
  },
  setNewChurches (state, payload) {
    state.CHURCH.create = payload
  },
  setIdChurches (state, payload) {
    state.CHURCH.id = payload
  },
  setDeleteChurches (state, payload) {
    state.CHURCH.delete = payload
  }
}

const churchActions = {
  getDataChurches (context) {
    getData('churches').then((res) => {
      context.commit('setChurches', res)
    })
  },
  getDataChurchesWithParams (context) {
    getDataWhitParameters('churches', context.getters.currentUser.id).then((res) => {
      context.commit('setChurches', res)
    })
  }
}

export { churchState, churchGetters, churchMutations, churchActions }
