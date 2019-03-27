import store from '@/store/store'

const featherMixing = {
  computed: {
    isFeather () {
      return store.getters.getCurrentUser.role_id === 1
    }
  }
}

export default featherMixing
