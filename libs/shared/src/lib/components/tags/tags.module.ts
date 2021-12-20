import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsComponent } from './tags.component';
import { MaterialModule } from '../../core/material';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [TagsComponent],
  exports: [TagsComponent]
})
export class TagsModule { }
