import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsComponent } from './tags.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule { }
