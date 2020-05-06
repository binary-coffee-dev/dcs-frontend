import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatTooltipModule,
  MatSelectModule,
  MatRippleModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatRippleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    TagInputModule
  ],
  exports: [
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatRippleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    TagInputModule
  ]
})
export class MaterialModule {}
