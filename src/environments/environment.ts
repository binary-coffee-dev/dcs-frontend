import sharedEnvironment from './base';

export const environment = {
  ...sharedEnvironment,
  apiUrl: sharedEnvironment['apiUrl'] || 'http://localhost:1337/',
  production: sharedEnvironment['production'] || false
};
