import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule, TagsModule } from '@dcs-libs/shared';
import { PostItemComponent } from './post-item.component';

@NgModule({
  declarations: [PostItemComponent],
  imports: [CommonModule, TagsModule, RouterModule, MaterialModule],
  exports: [PostItemComponent]
})
export class PostItemModule {
}
