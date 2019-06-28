export function inilializer (store, router) {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiredAuth)
    const currentUser = store.getters.getCurrentUser

    if (requiresAuth && !currentUser) {
      //! cambiar si se quiere otra ruta de entrada!
      next({ name: 'login' })
    } else if (to.path === '/login' && currentUser) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  })
}
