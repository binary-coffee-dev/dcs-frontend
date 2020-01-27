import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './features/app.component';
import { ReduxModule } from './core/redux';
import { MaterialModule } from './core/material';
import { HeaderComponent } from './features/components/header';
import { FooterComponent } from './features/components/footer/footer.component';
import { SocialLinksComponent } from './features/components/social-links/social-links.component';
import { InfoModule } from './features/info/info.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SocialLinksComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReduxModule,
    MaterialModule,
    InfoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
