import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'http://localhost:1337/',
  graphqlUrl: 'http://localhost:1337/graphql',
  podcastApiUrl: 'http://localhost:4500/podcasts',
  siteUrl: 'http://localhost:4202',
  siteDashboardUrl: 'http://localhost:4202/dashboard',
  production: false,
  local: true,
  githubClientId: 'f38efc18b8d63221e637',
  isDashboard: true,
  socials: {
    facebook: 'https://facebook.com/Binary-Coffee-111577483710684/',
    github: 'https://github.com/binary-coffee-dev',
    telegram: 'https://t.me/binarycoffeedev',
    twitter: 'https://twitter.com/CoffeeBinary/'
  },
  contactMail: 'mailto:website@binary-coffee.dev'
} as Environment;
