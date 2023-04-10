import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { Store } from '@ngxs/store';

import {
  AuthState,
  ChangeFilesPageAction, ChangeQueryAction, ConfigState, ConfirmationDialogComponent,
  FetchFilesAction,
  File,
  FileState,
  NextFilesPageAction, Permission, Permissions,
  PreviousFilesPageAction, RemoveFileAction, ROLE_PERMISSION_MAP, RoleEnum, SetConfigAction,
  UrlUtilsService, User
} from '@dcs-libs/shared';
import { UploadFileModalComponent } from '../../components/upload-file.modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends Permissions implements OnInit {
  files: File[] = [];

  numberOfPages = 0;
  currentPage = 0;

  tableOrCard = false;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private url: UrlUtilsService,
    @Inject(ROLE_PERMISSION_MAP) private rolePermissionMap: Map<RoleEnum, Permission[]>
  ) {
    super();
  }

  ngOnInit() {
    this.updateFilter();
    this.store.select(FileState.files).subscribe((files: File[]) => this.files = files);
    this.store.select(FileState.pageIndicators).subscribe(indicators => {
      if (indicators) {
        this.currentPage = indicators.page;
        this.numberOfPages = Math.ceil(indicators.count / indicators.pageSize);
      }
    });
    this.store.select(ConfigState.getConfigItem('dashboard-file-tableOrCard')).subscribe(value => this.tableOrCard = !!value);
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '425px'
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.refreshPage();
      }
    });
  }

  updateFilter() {
    let where = {};

    const me = this.meUser();
    if (me) {
      const permissionsByRole = this.rolePermissionMap.get(me.role.type) || [];
      if (permissionsByRole.findIndex(v => v === this.permissions().VIEW_ANY_IMAGE) === -1) {
        where = { user: me.id.toString() };
      }
    }

    this.store.dispatch(new ChangeQueryAction(where));
    this.refreshPage();
  }

  meUser(): User | undefined {
    return this.store.selectSnapshot(AuthState.me);
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

  toggleTableCard() {
    this.tableOrCard = !this.tableOrCard;
    this.store.dispatch(new SetConfigAction('dashboard-file-tableOrCard', this.tableOrCard));
  }

  removeImage(file: File) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { title: '¿Está seguro que desea eliminar la imágen?' }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new RemoveFileAction(file.id));
      }
    });
  }
}
