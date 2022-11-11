import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'https://api.binarycoffee.dev/',
  graphqlUrl: 'https://api.binarycoffee.dev/graphql',
  podcastApiUrl: 'https://api.binarycoffee.dev/podcasts/',
  siteUrl: 'https://binarycoffee.dev',
  siteDashboardUrl: 'https://binarycoffee.dev/dashboard',
  production: true,
  local: false,
  githubClientId: 'c37fad75ee13b3261065',
  isDashboard: true,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binary-coffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binary-coffee.dev'
} as Environment;
