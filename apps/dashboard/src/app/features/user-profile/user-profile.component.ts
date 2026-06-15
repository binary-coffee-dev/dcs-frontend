import {
  Component,
  OnInit,
  inject,
  effect,
  signal,
  computed,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import {
  AuthState,
  File,
  UpdateMeAction,
  UpdateMyAvatarAction,
  UrlUtilsService,
  User,
} from '@dcs-libs/shared';
import { UploadFileModalComponent } from '../components/upload-file.modal';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: false,
})
export class UserProfileComponent {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private url = inject(UrlUtilsService);

  me = toSignal(this.store.select(AuthState.me));
  professionalDataChange = signal<boolean>(false);

  getUserImage = computed(() => this.url.getUserImage(this.me()));

  personalForm = new UntypedFormGroup({
    username: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    description: new UntypedFormControl(''),
  });

  professionalForm = new UntypedFormGroup({
    school: new UntypedFormControl(''),
    study: new UntypedFormControl(''),
    page: new UntypedFormControl(''),
  });

  socialsForm = new UntypedFormGroup({
    facebook: new UntypedFormControl(''),
    twitter: new UntypedFormControl(''),
    linkedin: new UntypedFormControl(''),
  });

  privacyForm = new UntypedFormGroup({
    showEmail: new UntypedFormControl(''),
  });

  constructor() {
    effect(() => {
      const me = this.me();
      if (me) {
        this.personalForm.controls['username'].setValue(me.username);
        this.professionalForm.controls['page'].setValue(me.page);

        this.professionalDataChange.set(false);
      }
    });
  }

  saveProfessionalData() {
    const me = this.me();
    if (me) {
      this.store.dispatch(
        new UpdateMeAction(me.id, this.professionalForm.controls['page'].value)
      );
    }
  }

  onUserDataChange() {
    const me = this.me();
    if (me) {
      this.professionalDataChange.set(
        me.page !== this.professionalForm.controls['page'].value
      );
    }
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '50vh',
    });
    dialog.afterClosed().subscribe((result: File) => {
      const me = this.me();
      if (result && me) {
        this.store.dispatch(new UpdateMyAvatarAction(me.id, result.id));
      }
    });
  }
}
