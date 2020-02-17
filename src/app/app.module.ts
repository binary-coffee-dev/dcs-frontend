import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './features/app.component';
import {ReduxModule} from './core/redux';
import {MaterialModule} from './core/material';
import {HeaderComponent} from './features/components/header';
import {FooterComponent} from './features/components/footer';
import {SocialLinksComponent} from './features/components/social-links';
import {InfoModule} from './features/info/info.module';
import {NewLabelComponent} from './features/components/new-label';
import {ScrollTopComponent} from './features/components/scroll-top/scroll-top.component';
import {WINDOW} from './core/services';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent,
    NewLabelComponent,
    ScrollTopComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReduxModule,
    MaterialModule,
    InfoModule
  ],
  providers: [
    {provide: WINDOW, useValue: window}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
