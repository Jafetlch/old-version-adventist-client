import Axios from '@/plugins/axios'

/* eslint-disable */
export function login (credentials) {
  return new Promise((res, rej) => {
    Axios.post('/api/auth/login', 
      credentials
    ).then((response) => {
      res(response.data)
    }).catch((err) =>{
      rej("Wrong email or password")
    })  
  })
}

export function logout (credentials) {
  return new Promise((res, rej) => {
    Axios.post('/api/auth/logout')
    .then((response) => {
      res(response)
    }).catch((err) =>{
      rej("Error to Logout")
    })  
  })
}

export function getLocalUser () {
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    return null
  }
  return JSON.parse(userStr)
}
