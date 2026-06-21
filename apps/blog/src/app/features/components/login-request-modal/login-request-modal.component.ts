import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginService } from '../../../core/services';

@Component({
  selector: 'app-login-request-modal',
  templateUrl: './login-request-modal.component.html',
  styleUrls: ['./login-request-modal.component.scss'],
  standalone: false
})
export class LoginRequestModalComponent {
  private loginService = inject(LoginService);
  private dialogRef = inject<MatDialogRef<LoginRequestModalComponent>>(MatDialogRef);

  ok() {
    this.loginService.loginAction();
  }

  cancel() {
    this.dialogRef.close();
  }
}
