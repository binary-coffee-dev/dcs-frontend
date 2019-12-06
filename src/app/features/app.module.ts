import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReduxModule} from '../core/redux';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FlexLayoutModule,
    ReduxModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
