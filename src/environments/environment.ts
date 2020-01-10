import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  apiUrl: sharedEnvironment['apiUrl'] || 'http://localhost:1337/',
  graphqlUrl: sharedEnvironment['graphqlUrl'] || 'http://localhost:1337/graphql',
  siteUrl: sharedEnvironment['siteUrl'] || 'https://binary-coffee.dev',
  production: sharedEnvironment['production'] || false
};
