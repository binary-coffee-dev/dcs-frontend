import { Component, inject, computed, effect } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  AuthState,
  ChangeFilesPageAction,
  ChangeQueryAction,
  ConfirmationDialogComponent,
  ConfirmationDialogData,
  FetchFilesAction,
  File,
  FileState,
  NextFilesPageAction,
  Permission,
  Permissions,
  PreviousFilesPageAction,
  RemoveFileAction,
  ROLE_PERMISSION_MAP,
  RoleEnum,
  UrlUtilsService,
} from '@dcs-libs/shared';
import { UploadFileModalComponent } from '../../components/upload-file.modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent extends Permissions {
  private store = inject(Store);
  private dialog = inject(MatDialog);
  private url = inject(UrlUtilsService);
  private rolePermissionMap =
    inject<Map<RoleEnum, Permission[]>>(ROLE_PERMISSION_MAP);

  me = toSignal(this.store.select(AuthState.me));
  files = toSignal(this.store.select(FileState.files), { initialValue: [] });

  pageIndicators = toSignal(this.store.select(FileState.pageIndicators));
  numberOfPages = computed(() => {
    const pageIndicators = this.pageIndicators();
    if (pageIndicators) {
      return Math.ceil(pageIndicators.count / pageIndicators.pageSize);
    }
    return 0;
  });
  currentPage = computed(() => this.pageIndicators()?.page ?? 0);

  constructor() {
    super();

    effect(() => {
      let where = {};
      const me = this.me();
      if (me) {
        const permissionsByRole =
          this.rolePermissionMap.get(me.role.type) || [];
        if (
          permissionsByRole.findIndex(
            (v) => v === this.permissions().VIEW_ANY_IMAGE
          ) === -1
        ) {
          where = { user: { id: { eq: me.id.toString() } } };
        }
      }

      this.store.dispatch(new ChangeQueryAction(where));
      this.refreshPage();
    });
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '425px',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshPage();
      }
    });
  }

  refreshPage() {
    this.store.dispatch(new FetchFilesAction());
  }

  normalizeUrl(url: string) {
    return this.url.normalizeImageUrl(url);
  }

  nextPageEvent() {
    this.store.dispatch(new NextFilesPageAction());
  }

  previousPageEvent() {
    this.store.dispatch(new PreviousFilesPageAction());
  }

  selectPageEvent(page: number) {
    this.store.dispatch(new ChangeFilesPageAction(page));
  }

  removeImage(file: File) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: '¿Está seguro que desea eliminar la imágen?',
          okTitle: 'Eliminar',
        } as ConfirmationDialogData,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(new RemoveFileAction(file.id));
        }
      });
  }
}
