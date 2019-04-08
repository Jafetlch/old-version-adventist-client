import { getData, getDataWhitParameters } from '@/helper/data_getters'

const advertisementState = {
  ADVERTISEMENTS: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  }
}

const advertisementGetters = {
  getAdvertisements (state) {
    return state.ADVERTISEMENTS.data
  },
  getEditAdvertisements (state) {
    return state.ADVERTISEMENTS.edit
  },
  newAdvertisements (state) {
    return state.ADVERTISEMENTS.create
  },
  getIdAdvertisements (state) {
    return state.ADVERTISEMENTS.id
  },
  getDeleteAdvertisements (state) {
    return state.ADVERTISEMENTS.delete
  }
}

const advertisementMutations = {
  setAdvertisements (state, payload) {
    state.ADVERTISEMENTS.data = payload
  },
  setEditAdvertisements (state, payload) {
    state.ADVERTISEMENTS.edit = payload
  },
  setNewAdvertisements (state, payload) {
    state.ADVERTISEMENTS.create = payload
  },
  setIdAdvertisements (state, payload) {
    state.ADVERTISEMENTS.id = payload
  },
  setDeleteAdvertisements (state, payload) {
    state.ADVERTISEMENTS.delete = payload
  }
}

const advertisementActions = {
  getDataAdvertisements (context) {
    getData('advertisements').then((res) => {
      context.commit('setAdvertisements', res)
    })
  },
  getDataAdvertisementsWithParams (context) {
    getDataWhitParameters('advertisements', context.getters.getCurrentUser.id).then((res) => {
      context.commit('setAdvertisements', res)
    })
  }
}

export { advertisementState, advertisementGetters, advertisementMutations, advertisementActions }
