import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';
import { TagInputModule } from 'ngx-chips';


import { MaterialModule, SharedModule } from '@dcs-libs/shared';
import { OverviewComponent } from './overview/overview.component';
import { ListComponent } from './list/list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SelectImageModalComponent } from './overview/select-image-modal/select-image-modal.component';
import { PaginationModule } from '../components/pagination/pagination.module';
import { FilterComponent } from './list/filter/filter.component';
import { UploadFileModalModule } from '../components/upload-file.modal';

@NgModule({
  declarations: [OverviewComponent, ListComponent, SelectImageModalComponent, FilterComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MaterialModule,
    TagInputModule,
    PaginationModule,
    SharedModule,
    MarkdownModule.forRoot(),
    UploadFileModalModule
  ],
  entryComponents: [SelectImageModalComponent]
})
export class ArticleModule {
}
