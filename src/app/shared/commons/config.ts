import { HttpHeaders } from '@angular/common/http';
import { local, prod } from 'src/environments';
import Constants from './constants.common';

export const ENVIRONMENT = !local.production ? local : prod;

export const HTTP_OPTIONS = new HttpHeaders({
  'Accept': 'application/json'
});

export const MENU = [
  {
    LEVEL: Constants.LEVELS.ADMIN,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/dashboard/profile'
          }
        ],
      },
      {
        name: 'Chats',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: false,
        route: '/chats'
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  },
  {
    LEVEL: Constants.LEVELS.USER,
    MENU: [
      {
        name: 'Perfil',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: true,
        subMenu: [
          {
            name: 'Perfil',
            icon: "fa-solid fa-user",
            route: '/dashboard/profile'
          }
        ],
      },
      {
        name: 'Chats',
        icon: "fa-solid fa-user",
        selected: false,
        multiple: false,
        route: '/chats'
      },
      {
        name: 'Salir',
        icon: 'fa-solid fa-arrow-right-from-bracket',
        selected: false,
        multiple: false,
        action: 'logout()'
      }
    ]
  }
];