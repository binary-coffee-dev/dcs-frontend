import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

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

  personalForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    description: new UntypedFormControl('')
  });

  professionalForm = new UntypedFormGroup({
    school: new UntypedFormControl(''),
    study: new UntypedFormControl(''),
    page: new UntypedFormControl('')
  });

  socialsForm = new UntypedFormGroup({
    facebook: new UntypedFormControl(''),
    twitter: new UntypedFormControl(''),
    linkedin: new UntypedFormControl('')
  });

  privacyForm = new UntypedFormGroup({
    showEmail: new UntypedFormControl('')
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
