import {Provider} from '@dcs-libs/shared';

export const PROVIDERS = [
  {
    name: 'github',
    icon: 'fa fa-github',
    scope: 'read:user read:email read:follow',
    url: 'https://github.com/login/oauth/authorize'
  }
] as Provider[];
