import Axios from '@/plugins/axios'

/* eslint-disable */
export function getData (api) {
  return new Promise((res, rej) => {
    Axios.get(`/api/${api}`).then(response => {
      res(response.data.data)
    }).catch(error => {
      rej('Lastimosamente no se pudo encontrar los datos.')
    })
  })
}

export function createData (api, parameters) {
  return new Promise((res, rej) => {
    Axios.post(`/api/${api}`, parameters)
    .then((response) => {
      if (response.data.response) {
        res('Se ha creado satisfactoriamente.')
      }
    }).catch((error) => {
      rej('Lastimosamente no se pudo crear.')
    })
  })
}

export function editData (api, id, parameters) {
  return new Promise((res, rej) => {
    Axios.put(`/api/${api}/${id}`, parameters)
    .then((response) => {
      if (response.data.response) {
        res('Se ha editado satisfactoriamente.')
      }
    }).catch((error) => {
      rej('Lastimosamente no se pudo editar.')
    })
  })
}

export function showData (api, id) {
  return new Promise((res, rej) => {
    Axios.get(`/api/${api}/${id}`)
    .then(response => {
      res(response.data.data)
    }).catch(error => {
      rej('Lastimosamente no se pudo encontrar los datos.')
    })
  })
}

export function deleteData (api, id) {
  return new Promise((res, rej) => {
    Axios.delete(`/api/${api}/${id}`)
    .then(response => {
      if (response.data.response) {
        res('Se elimino correctamente.')
      } else {
        res('Lastimosamente no se pudo eliminar')
      }
    }).catch(error => {
      rej('Lastimosamente no se pudo eliminar')
    })
  })
}

export function getDataWhitParameters (api, user_id) {
  return new Promise((res, rej) => {
    Axios.get(`/api/${api}/${user_id}`).then(response => {
      res(response.data.data)
    }).catch(error => {
      rej('No se pudieron enconrar los datos.')
    })
  })
}
