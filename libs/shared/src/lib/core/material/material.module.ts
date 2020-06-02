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
  MatMenuModule, MatDatepickerModule, MatNativeDateModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatDatepickerModule,
    MatNativeDateModule
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
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class MaterialModule {}
