import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'https://api-dev.binarycoffee.dev/',
  graphqlUrl: 'https://api-dev.binarycoffee.dev/graphql',
  siteUrl: 'https://dev.binarycoffee.dev',
  siteDashboardUrl: 'https://dev.binarycoffee.dev/dashboard',
  googleAnalyticsId: 'UA-157555549-2',
  production: true,
  postPageSize: 12,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binarycoffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binarycoffee.dev'
} as Environment;
