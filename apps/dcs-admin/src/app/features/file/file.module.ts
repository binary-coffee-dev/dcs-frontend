import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClipboardModule} from 'ngx-clipboard';

import {MaterialModule} from '../../core/material/material.module';
import {ListComponent} from './list/list.component';
import {FileRoutingModule} from './file-routing.module';
import {PaginationModule} from '../components/pagination/pagination.module';
import {UploadFileModalModule} from '../components/upload-file.modal';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    FileRoutingModule,
    MaterialModule,
    PaginationModule,
    ClipboardModule,
    UploadFileModalModule
  ]
})
export class FileModule {
}
