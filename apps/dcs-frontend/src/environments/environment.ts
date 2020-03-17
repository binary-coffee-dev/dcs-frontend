import {Environment} from '@dcs-libs/shared';

export const environment = {
  apiUrl: 'http://localhost:1337/',
  graphqlUrl: 'http://localhost:1337/graphql',
  siteUrl: 'http://localhost:4200',
  siteDashboardUrl: 'http://localhost:4201',
  googleAnalyticsId: 'UA-157555549-2',
  production: false,
  postPageSize: 6
} as Environment;
