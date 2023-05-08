import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  @Input() title = '';
  @Input() okTitle = 'Ok';
  @Input() cancelTitle = 'Cancelar';

  constructor(private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, okTitle: string, cancelTitle: string }) {
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
