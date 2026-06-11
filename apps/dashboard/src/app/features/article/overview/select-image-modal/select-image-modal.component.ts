import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { Store } from '@ngxs/store';

import {
  ChangeFilesPageAction,
  FetchFilesAction,
  File,
  FileState,
  NextFilesPageAction,
  PreviousFilesPageAction,
  UrlUtilsService
} from '@dcs-libs/shared';

@Component({
    selector: 'app-select-image-modal',
    templateUrl: './select-image-modal.component.html',
    styleUrls: ['./select-image-modal.component.scss'],
    standalone: false
})
export class SelectImageModalComponent implements OnInit {
  private store = inject(Store);
  private dialogRef = inject<MatDialogRef<SelectImageModalComponent>>(MatDialogRef);
  private url = inject(UrlUtilsService);


  files: File[] = [];

  currentPage = 0;
  numberOfPages = 0;

  ngOnInit() {
    this.store.select(FileState.files).subscribe((files: File[]) => {
      if (files) {
        this.files = files;
      }
    });
    this.store.dispatch(new FetchFilesAction(6));
    this.store.select(FileState.pageIndicators).subscribe(indicator => {
      if (indicator) {
        this.currentPage = indicator.page;
        this.numberOfPages = Math.ceil(indicator.count / indicator.pageSize);
      }
    });
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
