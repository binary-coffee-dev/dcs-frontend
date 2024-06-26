import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsModule } from '@ngxs/store';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import {
  AuthState,
  ConfigState,
  ENVIRONMENT,
  FileState,
  NotificationState,
  PostState,
  ReduxModule,
  SharedModule,
  TagState
} from '@dcs-libs/shared';
import { AppComponent } from './features/app.component';
import { ComponentsModule } from './features/components/components.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri: environment.graphqlUrl}),
    cache: new InMemoryCache()
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    RouterModule,
    ComponentsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReduxModule,
    SharedModule,
    NgxsModule.forRoot([PostState, AuthState, FileState, NotificationState, ConfigState, TagState], {
      developmentMode: !environment.production
    })
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
