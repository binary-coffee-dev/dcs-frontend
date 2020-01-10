import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './features/app.component';
import {ReduxModule} from './core/redux';
import {MaterialModule} from './core/material';
import {HeaderComponent} from './features/components/header';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReduxModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
