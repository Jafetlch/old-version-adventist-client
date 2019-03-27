import axios from 'axios'
import store from '@/store/store'
import router from '@/router'

var api = axios.create({
  baseURL: 'http://127.0.0.1:6060',
  'headers': {
    'X-Requested-With': 'XMLHttpRequest'
  }
})

api.interceptors.request.use((config) => {
  config.headers = {
    'special_token': 'f34th3r.io',
    'Authorization': `Bearer ${store.getters.getCurrentUser ? store.getters.getCurrentUser.token : ''}`
  }
  return config
}, function (error) {
  // Do something with request error
  store.commit('logout')
  router.push({ name: 'login' })
  return Promise.reject(error)
})

export default api
