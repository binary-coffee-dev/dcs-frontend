import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UploadFileModalComponent} from './upload-file.modal.component';
import {MaterialModule} from '../../../core/material/material.module';

@NgModule({
  declarations: [UploadFileModalComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [UploadFileModalComponent],
  entryComponents: [UploadFileModalComponent]
})
export class UploadFileModalModule {
}
