import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';

import {
  SharedModule,
  FooterComponent,
  SocialLinksComponent,
  ENVIRONMENT,
  ReduxModule,
  AuthState,
  PostState,
  CommentState,
  CommentService,
  MaterialModule, PodcastState, ConfigState
} from '@dcs-libs/shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './features/app.component';
import { HeaderComponent } from './features/components/header';
import { InfoModule } from './features/info/info.module';
import { ScrollTopComponent } from './features/components/scroll-top';
import { NewLabelComponent } from './features/components/new-label';
import { CliComponent } from './features/components/cli/cli.component';
import { environment } from '../environments/environment';
import { LoginButtonComponent } from './features/components/login-button/login-button.component';
import { createApollo } from './core/graphql';
import { LoginRequestModalComponent } from './features/components/login-request-modal';
import { PodcastModule } from './features/podcast';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    NewLabelComponent,
    ScrollTopComponent,
    CliComponent,
    LoginButtonComponent,
    LoginRequestModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([CommentState, AuthState, PostState, PodcastState, ConfigState], {
      developmentMode: !environment.production
    }),
    ReduxModule,
    MaterialModule,
    InfoModule,
    SharedModule,
    PodcastModule
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
    },
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
