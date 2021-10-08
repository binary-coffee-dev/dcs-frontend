import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@dcs-libs/shared';
import { TopPopularUsersComponent } from './top-popular-users.component';

@NgModule({
  declarations: [TopPopularUsersComponent],
  exports: [
    TopPopularUsersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class TopPopularUsersModule { }
