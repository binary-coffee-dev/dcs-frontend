import { Environment } from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'http://localhost:1337/',
  graphqlUrl: 'http://localhost:1337/graphql',
  podcastApiUrl: 'http://localhost:4500/podcasts',
  siteUrl: 'http://localhost:4202',
  siteDashboardUrl: 'http://localhost:4202/dashboard',
  googleAnalyticsId: 'UA-157555549-2',
  production: false,
  postPageSize: 6
} as Environment;
