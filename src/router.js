import Vue from 'vue'
import Router from 'vue-router'
import Page404 from '@/views/error/Page404.vue'
import Login from '@/views/auth/Login'
import Home from '@/views/Home'
import Dashboard from '@/views/Dashboard'
import UnionMain from '@/views/unions/UnionMain'
import GroupMain from '@/views/groups/GroupMain'
import ChurchMain from '@/views/churches/ChurchMain'
import DepartmentMain from '@/views/departments/DepartmentMain'
import AdvertisementMain from '@/views/advertisements/AdvertisementMain'
import MyAdvertisements from '@/views/advertisements/MyAdvertisements'
import Settings from '@/views/auth/Settings'

Vue.use(Router)

function myRole () {
  const role = localStorage.getItem('user')
  if (!role) {
    return null
  }
  const data = JSON.parse(role)
  return data.role_id
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      component: Page404
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
      // meta: {
      //   requiredAuth: true
      // }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/unions',
      name: 'union',
      component: UnionMain,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/association-mission',
      name: 'association-mission',
      component: GroupMain,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '3') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/churches',
      name: 'churches',
      component: ChurchMain,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '4') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/departments',
      name: 'departments',
      component: DepartmentMain,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '5' || myRole() === '3' || myRole() === '4') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/advertisements',
      name: 'advertisements',
      component: AdvertisementMain,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '5' || myRole() === '3' || myRole() === '4') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/my-advertisements',
      name: 'my-advertisements',
      component: MyAdvertisements,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '5' || myRole() === '3' || myRole() === '4') {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiredAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (myRole() === '1' || myRole() === '5' || myRole() === '3' || myRole() === '4') {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
})
