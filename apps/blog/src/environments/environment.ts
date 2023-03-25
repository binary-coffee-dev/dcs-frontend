import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'http://localhost:1337/',
  graphqlUrl: 'http://localhost:1337/graphql',
  siteUrl: 'http://localhost:4202',
  siteDashboardUrl: 'http://localhost:4202/dashboard',
  googleAnalyticsId: 'UA-157555549-2',
  production: false,
  postPageSize: 12,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binary-coffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binary-coffee.dev'
} as Environment;
