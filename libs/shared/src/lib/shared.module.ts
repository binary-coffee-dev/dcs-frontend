import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoadingComponent} from './features/loading/loading.component';
import {WINDOW, windowFactory} from './core/models';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  providers: [{provide: WINDOW, useFactory: windowFactory}]
})
export class SharedModule {}
