import {HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {environment} from '../../../environments/environment';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: environment.graphqlUrl}),
    cache: new InMemoryCache(),
  };
}
