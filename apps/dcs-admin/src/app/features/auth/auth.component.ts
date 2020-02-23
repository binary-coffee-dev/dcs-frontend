import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngxs/store';

import {AuthErrorAction, LoginAction} from '../../core/redux/actions';
import {AuthState} from '../../core/redux/states';
import {AuthError} from '../../core/redux/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authError: AuthError = null;

  loginForm = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.authError).subscribe(error => this.authError = error);
  }

  login() {
    if (this.loginForm.valid && this.checkEmptySpaces(this.loginForm.controls.identifier.value)) {
      const identifier = this.loginForm.controls.identifier.value;
      const password = this.loginForm.controls.password.value;
      this.store.dispatch(new LoginAction(identifier, password)).subscribe(() => {
        this.redirectToDashboard();
      });
    } else {
      this.store.dispatch(new AuthErrorAction('Missing data in login'));
    }
  }

  redirectToDashboard() {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '') {
      this.router.navigate(['dashboard']);
    }
  }

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
