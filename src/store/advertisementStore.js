import { getData } from '@/helper/data_getters'

const advertisementState = {
  ADVERTISEMENTS: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  },
  DISPLAYAD: {
    data: null
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
  },
  getDisplayAd (state) {
    return state.DISPLAYAD.data
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
  },
  setDisplayAd (state, payload) {
    state.DISPLAYAD.data = payload
  }
}

const advertisementActions = {
  getAdvertisements (context) {
    getData('advertisements').then((res) => {
      context.commit('setAdvertisements', res)
    })
  }
}

export { advertisementState, advertisementGetters, advertisementMutations, advertisementActions }
