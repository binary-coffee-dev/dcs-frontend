export interface Provider {
  name: string;
  icon: string;
  scope: string[];
}

export const PROVIDERS = [
  {
    name: 'github',
    icon: 'fa fa-github',
    scope: [
      'read:user',
      'read:email',
      'read:follow'
    ]
  }
] as Provider[];
