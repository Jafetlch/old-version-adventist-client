import axios from 'axios'
import store from '@/store/store'
import router from '@/router'

var api = axios.create({
  baseURL: 'http://localhost:6060',
  'headers': {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${store.getters.getCurrentUser ? store.getters.getCurrentUser.token : ''}`
  }
  return config
}, function (error) {
  // Do something with request error
  store.commit('logout')
  router.push({ name: 'login' })
  return Promise.reject(error)
})

export default api
