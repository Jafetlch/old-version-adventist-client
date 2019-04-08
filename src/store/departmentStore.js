import { getData, getDataWhitParameters } from '@/helper/data_getters'

const departmentState = {
  DEPARTMENT: {
    data: [],
    id: null,
    create: false,
    edit: false,
    delete: false
  }
}

const departmentGetters = {
  getDepartments (state) {
    return state.DEPARTMENT.data
  },
  getEditDepartments (state) {
    return state.DEPARTMENT.edit
  },
  newDepartments (state) {
    return state.DEPARTMENT.create
  },
  getIdDepartments (state) {
    return state.DEPARTMENT.id
  },
  getDeleteDepartments (state) {
    return state.DEPARTMENT.delete
  }
}

const departmentMutations = {
  setDepartments (state, payload) {
    state.DEPARTMENT.data = payload
  },
  setEditDepartments (state, payload) {
    state.DEPARTMENT.edit = payload
  },
  setNewDepartments (state, payload) {
    state.DEPARTMENT.create = payload
  },
  setIdDepartments (state, payload) {
    state.DEPARTMENT.id = payload
  },
  setDeleteDepartments (state, payload) {
    state.DEPARTMENT.delete = payload
  }
}

const departmentActions = {
  getDataDepartments (context) {
    getData('departments').then((res) => {
      context.commit('setDepartments', res)
    })
  },
  getDataDepartmentsWithParams (context) {
    getDataWhitParameters('departments', context.getters.getCurrentUser.id).then((res) => {
      context.commit('setDepartments', res)
    })
  }
}

export { departmentState, departmentGetters, departmentMutations, departmentActions }
