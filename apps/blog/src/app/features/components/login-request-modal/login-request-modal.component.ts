import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-request-modal',
  templateUrl: './login-request-modal.component.html',
  styleUrls: ['./login-request-modal.component.scss']
})
export class LoginRequestModalComponent {

  constructor(private dialogRef: MatDialogRef<LoginRequestModalComponent>) {
  }

  ok() {
    // toDo 28.01.22, guille,
  }

  cancel() {
    this.dialogRef.close();
  }
}
