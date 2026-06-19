import { provideClientHydration } from '@angular/platform-browser';
import { APP_ID, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgOptimizedImage } from "@angular/common";
import { provideServerRendering, withRoutes } from '@angular/ssr';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import {
  SharedModule,
  ENVIRONMENT,
  ReduxModule,
  AuthState,
  PostState,
  CommentState,
  CommentService,
  MaterialModule,
  PodcastState,
  ConfigState, UserInfoState, SubscriptionState
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
import { UserModule } from './features/user';
import { FilterComponent } from './features/components/filter/filter.component';
import { serverRoutes } from './app.routes.server'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FilterComponent,
    NewLabelComponent,
    ScrollTopComponent,
    CliComponent,
    LoginButtonComponent,
    LoginRequestModalComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([CommentState, AuthState, PostState, PodcastState, ConfigState, UserInfoState, SubscriptionState], {
      developmentMode: !environment.production
    }),
    ReduxModule,
    MaterialModule,
    InfoModule,
    SharedModule,
    PodcastModule,
    UserModule, NgOptimizedImage
  ],
  providers: [
    {
      provide: APP_ID,
      useValue: 'serverApp'
    },
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    },
    CommentService,
    provideHttpClient(withInterceptorsFromDi()),
    provideClientHydration(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideServerRendering(withRoutes(serverRoutes))
  ]
})
export class AppModule {
}
