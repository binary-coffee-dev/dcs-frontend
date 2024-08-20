import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'https://api-dev.binarycoffee.dev/',
  graphqlUrl: 'https://api-dev.binarycoffee.dev/graphql',
  podcastApiUrl: 'https://api-dev.binarycoffee.dev/podcasts/',
  siteUrl: 'https://dev.binarycoffee.dev',
  siteDashboardUrl: 'https://dev.binarycoffee.dev/dashboard',
  production: false,
  local: false,
  githubClientId: '3fdd7684a78a0896c870',
  isDashboard: true,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binarycoffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binarycoffee.dev'
} as Environment;
