import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  SharedModule,
  FooterComponent,
  SocialLinksComponent,
  ENVIRONMENT,
  ReduxModule as ReduxSharedModule
} from '@dcs-libs/shared';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './features/app.component';
import {ReduxModule} from './core/redux';
import {MaterialModule} from './core/material';
import {HeaderComponent} from './features/components/header';
import {InfoModule} from './features/info/info.module';
import {ScrollTopComponent} from './features/components/scroll-top';
import {NewLabelComponent} from './features/components/new-label';
import {CliComponent} from './features/components/cli/cli.component';
import {environment} from '../environments/environment';
import { LoginButtonComponent } from './features/components/login-button/login-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    NewLabelComponent,
    ScrollTopComponent,
    CliComponent,
    LoginButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReduxModule,
    ReduxSharedModule,
    MaterialModule,
    InfoModule,
    SharedModule
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
