// eslint-disable-next-line
import store from '@/store/store'

const currentUserMixing = {
  computed: {
    currentUser () {
      return store.getters.getCurrentUser
    },
    currentUserRoleId () {
      return store.getters.getCurrentUser.role_id.toString() //* on beta
    }
  }
}

export default currentUserMixing
