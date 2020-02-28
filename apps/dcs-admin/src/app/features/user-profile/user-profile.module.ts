import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '@dcs-libs/shared';
import {UserProfileComponent} from './user-profile.component';
import {UserProfileRoutingModule} from './user-profile-routing.module';
import {UploadFileModalModule} from '../components/upload-file.modal';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
    UploadFileModalModule
  ]
})
export class UserProfileModule {
}
