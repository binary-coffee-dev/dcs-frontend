import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  apiUrl: sharedEnvironment['apiUrl'] || 'http://localhost:1337/',
  graphqlUrl: sharedEnvironment['graphqlUrl'] || 'http://localhost:1337/graphql',
  siteUrl: sharedEnvironment['siteUrl'] || 'https://binary-coffee.dev',
  googleAnalyticsId: sharedEnvironment['googleAnalyticsId'] || 'UA-157555549-2',
  production: sharedEnvironment['production'] || false
};
