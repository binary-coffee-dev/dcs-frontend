import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import {
  AuthState,
  File,
  UpdateMeAction,
  UpdateMyAvatarAction,
  UrlUtilsService,
  User
} from '@dcs-libs/shared';
import { UploadFileModalComponent } from '../components/upload-file.modal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  me: User;
  professionalDataChange = false;

  personalForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    description: new FormControl('')
  });

  professionalForm = new FormGroup({
    school: new FormControl(''),
    study: new FormControl(''),
    page: new FormControl('')
  });

  socialsForm = new FormGroup({
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    linkedin: new FormControl('')
  });

  privacyForm = new FormGroup({
    showEmail: new FormControl('')
  });

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private url: UrlUtilsService
  ) {
  }

  ngOnInit() {
    this.store.select(AuthState.me).subscribe((me: User) => {
      if (me) {
        this.me = me;
        this.personalForm.controls.username.setValue(me.username);
        this.professionalForm.controls.page.setValue(me.page);

        this.professionalDataChange = false;
      }
    });
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
  }

  saveProfessionalData() {
    this.store.dispatch(
      new UpdateMeAction(
        this.me.id,
        this.professionalForm.controls.page.value
      )
    );
  }

  onUserDataChange() {
    this.professionalDataChange = this.me.page !== this.professionalForm.controls.page.value;
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '50vh'
    });
    dialog.afterClosed().subscribe((result: File) => {
      if (result) {
        this.store.dispatch(new UpdateMyAvatarAction(this.me.id, result.id));
      }
    });
  }
}
