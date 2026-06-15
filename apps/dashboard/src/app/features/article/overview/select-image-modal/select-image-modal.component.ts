import { Component, OnInit, inject, computed } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import {
  ChangeFilesPageAction,
  FetchFilesAction,
  File,
  FileState,
  NextFilesPageAction,
  PreviousFilesPageAction,
  UrlUtilsService,
} from '@dcs-libs/shared';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-select-image-modal',
  templateUrl: './select-image-modal.component.html',
  styleUrls: ['./select-image-modal.component.scss'],
  standalone: false,
})
export class SelectImageModalComponent implements OnInit {
  private store = inject(Store);
  private dialogRef =
    inject<MatDialogRef<SelectImageModalComponent>>(MatDialogRef);
  private url = inject(UrlUtilsService);

  files = toSignal(this.store.select(FileState.files), { initialValue: [] });

  pageIndicators = toSignal(this.store.select(FileState.pageIndicators));
  currentPage = computed(() => this.pageIndicators()?.page ?? 0);
  numberOfPages = computed(() => {
    const pageIndicators = this.pageIndicators();
    if (pageIndicators) {
      return Math.ceil(
        pageIndicators.count / pageIndicators.pageSize
      );
    }
    return 0;
  });

  ngOnInit() {
    this.store.dispatch(new FetchFilesAction(6));
  }

  selectImage(image: File) {
    this.dialogRef.close(image);
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

  cancel() {
    this.dialogRef.close();
  }
}
