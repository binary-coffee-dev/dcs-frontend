import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';


@NgModule({
  declarations: [
    PrivacyComponent,
    CookiesComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    CommonModule
  ]
})
export class InfoModule {
}
