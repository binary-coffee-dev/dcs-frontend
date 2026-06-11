import { Component, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    standalone: false
})
export class ConfirmationDialogComponent implements OnInit {
  private dialogRef = inject<MatDialogRef<ConfirmationDialogComponent>>(MatDialogRef);
  data = inject<{
    title: string;
    okTitle: string;
    cancelTitle: string;
}>(MAT_DIALOG_DATA);


  @Input() title = '';
  @Input() okTitle = 'Ok';
  @Input() cancelTitle = 'Cancelar';

  constructor() {
    const data = this.data;

    this.title = data.title || this.title;
    this.okTitle = data.okTitle || this.okTitle;
    this.cancelTitle = data.cancelTitle || this.cancelTitle;
  }

  ngOnInit(): void {
  }

  ok() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
