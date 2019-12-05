import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  apiUrl: sharedEnvironment['apiUrl'] || 'http://localhost:1337/',
  graphqlUrl: sharedEnvironment['graphqlUrl'] || 'http://localhost:1337/graphql',
  production: sharedEnvironment['production'] || false
};
