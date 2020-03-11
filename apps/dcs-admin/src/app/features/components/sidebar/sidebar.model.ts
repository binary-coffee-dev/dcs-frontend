export declare interface Access {
  id: number;
  active: boolean;
  visible: boolean;
  icon: string;
  img: string;
  class: string;
  text: string;
  title: string;
  route: RouteInfo[];
}

export declare interface RouteInfo {
  accessId: number;
  visible: boolean;
  path: string;
  icon: string;
  class: string;
  text: string;
  title: string;
}

// with this enum you can change the order
export enum AccessIds {
  USER,
  BOARD
}

export let ACCESS: Access[] = [
  {
    id: AccessIds.USER,
    active: false,
    visible: true,
    text: 'Usuario',
    title: 'Usuario',
    class: '',
    icon: '',
    img: '',
    route: []
  },
  {
    id: AccessIds.BOARD,
    active: true,
    visible: true,
    text: 'Tablero',
    title: 'Tablero',
    class: '',
    icon: 'fa fa-dashboard',
    img: '',
    route: []
  }
];

// the accessId is a reference to a Access.id
export let ROUTES: RouteInfo[] = [
  {
    accessId: AccessIds.USER,
    visible: false,
    path: '/dashboard',
    text: 'Tablero',
    title: '',
    class: '',
    icon: ''
  },
  {
    accessId: AccessIds.USER,
    visible: true,
    path: '/user-profile',
    text: 'Perfil',
    title: 'Administar mi perfil',
    class: '',
    icon: ''
  },
  {
    accessId: AccessIds.USER,
    visible: true,
    path: '',
    text: 'Salir',
    title: 'Salir del Binary Board',
    class: '',
    icon: ''
  },
  {
    accessId: AccessIds.BOARD,
    visible: true,
    path: '/articles',
    text: 'Artículos',
    title: 'Gestionar mis artículos',
    class: '',
    icon: ''
  },
  {
    accessId: AccessIds.BOARD,
    visible: true,
    path: '/files',
    text: 'Archivos',
    title: 'Gestionar mis archivos',
    class: '',
    icon: ''
  }
];
