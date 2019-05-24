export function menuItems (currentUserRoleId) {
  return [
    {
      header: 'dashboard',
      content: [
        {
          icon: 'home',
          text: 'Home',
          route: '/',
          name: 'home',
          show: true
        }
      ]
    },
    {
      header: 'administración',
      content: [
        {
          icon: 'person',
          text: 'Usuario',
          route: '/users',
          name: 'user',
          show: (currentUserRoleId === '1')
        },
        {
          icon: 'center_focus_strong',
          text: 'Uniones',
          route: '/unions',
          name: 'unions',
          show: (currentUserRoleId === '1')
        },
        {
          icon: 'grain',
          text: 'Asociaciones y Misiones',
          route: '/association-mission',
          name: 'association-mission',
          show: (currentUserRoleId === '1' || currentUserRoleId === '3')
        },
        {
          icon: 'local_library',
          text: 'Iglesias',
          route: '/churches',
          name: 'churches',
          show: (currentUserRoleId === '1' || currentUserRoleId === '4')
        },
        {
          icon: 'class',
          text: 'Departamentos',
          route: '/departments',
          name: 'departments',
          show: (currentUserRoleId === '1' || currentUserRoleId === '3' || currentUserRoleId === '4' || currentUserRoleId === '5')
        }
      ]
    },
    {
      header: 'Noticias',
      content: [
        {
          icon: 'add',
          text: 'Añadir',
          route: '/advertisements',
          show: (currentUserRoleId === '1' || currentUserRoleId === '3' || currentUserRoleId === '4' || currentUserRoleId === '5')
        },
        {
          icon: 'folder_open',
          text: 'Publicationes',
          route: '/my-advertisements',
          show: (currentUserRoleId === '1' || currentUserRoleId === '3' || currentUserRoleId === '4' || currentUserRoleId === '5')
        }
      ]
    },
    {
      header: 'account',
      content: [
        {
          icon: 'settings',
          text: 'Account setting',
          route: '/settings',
          show: (currentUserRoleId === '1' || currentUserRoleId === '3' || currentUserRoleId === '4' || currentUserRoleId === '5')
        }
      ]
    }
  ]
}
