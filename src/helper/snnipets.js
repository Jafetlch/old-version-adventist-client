import store from '@/store/store'
// surfergirl121

export function passGenerator () {
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let pass = ''
  for (let i = 0; i < 5; i++) {
    pass += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return pass
}

export function getId (value) {
  switch (value) {
    case 'unions' || 'union':
      return store.getters.getIdUnions

    case 'groups' || 'group':
      return store.getters.getIdGroups

    case 'churches' || 'church':
      return store.getters.getIdChurches

    case 'departments' || 'departments':
      return store.getters.getIdDepartments

    case 'user' || 'user':
      return store.getters.getIdUsers

    case 'advertisement' || 'advertisements':
      return store.getters.getIdAdvertisements
  }
}

export function getCommitEdit (value, boolean) {
  switch (value) {
    case 'unions' || 'union':
      return store.commit('setEditUnions', boolean)

    case 'groups' || 'group':
      return store.commit('setEditGroups', boolean)

    case 'churches' || 'church':
      return store.commit('setEditChurches', boolean)

    case 'departments' || 'departments':
      return store.commit('setEditDepartments', boolean)

    case 'user' || 'user':
      return store.commit('setEditUsers', boolean)
  }
}

export function getCommitDelete (value, boolean) {
  switch (value) {
    case 'unions' || 'union':
      return store.commit('setDeleteUnions', boolean)
    case 'groups' || 'group':
      return store.commit('setDeleteGroups', boolean)
    case 'churches' || 'church':
      return store.commit('setDeleteChurches', boolean)
    case 'departments' || 'departments':
      return store.commit('setDeleteDepartments', boolean)
    case 'user' || 'user':
      return store.commit('setDeleteUsers', boolean)
  }
}

export function getDataFrom (role, withOutParameters, withParameters) {
  if (role === 1) {
    store.dispatch(withOutParameters)
  } else {
    store.dispatch(withParameters)
  }
}

export function getDispatch (value) {
  // cuando se termine la actualizacion del frontend eliminar los parametros repetidos en getDataFrom()
  switch (value) {
    case 'unions' || 'union':
      return store.dispatch('getDataUnions')

    case 'groups' || 'group':
      return getDataFrom(store, store.getters.currentUser.role_id, 'getDataGroups', 'getDataGroupsWithParams')

    case 'churches' || 'church':
      return getDataFrom(store, store.getters.currentUser.role_id, 'getDataChurches', 'getDataChurchesWithParams')

    case 'departments' || 'departments':
      return getDataFrom(store, store.getters.currentUser.role_id, 'getDataDepartments', 'getDataDepartmentsWithParams')

    case 'user' || 'user':
      return store.dispatch('getDataUsers')
  }
}
