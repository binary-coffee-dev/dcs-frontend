import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { MaterialModule } from '@dcs-libs/shared';
import { PrivacyComponent } from './privacy/privacy.component';
import { CookiesComponent } from './cookies/cookies.component';


@NgModule({
  declarations: [
    PrivacyComponent,
    CookiesComponent
  ],
  imports: [
    MarkdownModule.forRoot(),
    CommonModule,
    MaterialModule,
  ],
  exports: [
    PrivacyComponent,
    CookiesComponent
  ]
})
export class InfoModule {
}
