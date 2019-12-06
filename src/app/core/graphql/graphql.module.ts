import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {environment} from '../../../environments/environment';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: environment.graphqlUrl}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [CommonModule, ApolloModule, HttpLinkModule],
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
