import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApolloModule } from 'apollo-angular';

import { AuthInterceptor } from '../interceptors/auth.interceptor';

@NgModule({
  imports: [CommonModule, ApolloModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
})
export class GraphQLModule {
}
