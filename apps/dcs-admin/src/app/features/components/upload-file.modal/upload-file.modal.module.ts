import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@dcs-libs/shared';
import { UploadFileModalComponent } from './upload-file.modal.component';

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
