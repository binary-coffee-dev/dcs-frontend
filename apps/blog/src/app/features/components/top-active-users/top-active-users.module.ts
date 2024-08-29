import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@dcs-libs/shared';
import { TopActiveUsersComponent } from './top-active-users.component';

@NgModule({
  declarations: [TopActiveUsersComponent],
  exports: [
    TopActiveUsersComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        NgOptimizedImage
    ]
})
export class TopActiveUsersModule { }
