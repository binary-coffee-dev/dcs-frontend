import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'https://api.binary-coffee.dev/',
  graphqlUrl: 'https://api.binary-coffee.dev/graphql',
  podcastApiUrl: 'https://api.binary-coffee.dev/podcasts/',
  siteUrl: 'https://binary-coffee.dev',
  siteDashboardUrl: 'https://binary-coffee.dev/dashboard',
  googleAnalyticsId: 'UA-157555549-1',
  production: true,
  postPageSize: 12,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binary-coffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binary-coffee.dev'
} as Environment;
