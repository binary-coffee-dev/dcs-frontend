import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { LoginService } from '../../../core/services';

@Component({
  selector: 'app-login-request-modal',
  templateUrl: './login-request-modal.component.html',
  styleUrls: ['./login-request-modal.component.scss']
})
export class LoginRequestModalComponent {

  constructor(
    private loginService: LoginService,
    private dialogRef: MatDialogRef<LoginRequestModalComponent>) {
  }

  ok() {
    this.loginService.loginAction();
  }

  cancel() {
    this.dialogRef.close();
  }
}
