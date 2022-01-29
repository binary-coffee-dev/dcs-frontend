export declare interface RouteInfo {
  accessId: number;
  visible: boolean;
  path: string;
  icon: string;
  class: string;
  text: string;
  title?: string;
}

// with this enum you can change the order
export enum AccessIds {
  USER,
  BOARD
}

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
    text: 'Editar Perfil',
    class: '',
    icon: 'fa fa-user'
  },
  {
    accessId: AccessIds.BOARD,
    visible: true,
    path: '/articles/create',
    text: 'Publicar Artículo',
    class: '',
    icon: 'fa fa-file'
  },
  {
    accessId: AccessIds.BOARD,
    visible: true,
    path: '/articles',
    text: 'Gestionar Artículos',
    class: '',
    icon: 'fa fa-quote-right'
  },
  {
    accessId: AccessIds.BOARD,
    visible: true,
    path: '/files',
    text: 'Gestionar Archivos',
    class: '',
    icon: 'fa fa-image'
  }
];
