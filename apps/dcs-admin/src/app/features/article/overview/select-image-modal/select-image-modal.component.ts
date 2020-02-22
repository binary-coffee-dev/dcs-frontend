import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

import {Store} from '@ngxs/store';

import {FileState} from '../../../../core/redux/states';
import {File} from '../../../../core/redux/models';
import {
  ChangeFilesPageAction,
  FetchFilesAction,
  NextFilesPageAction,
  PreviousFilesPageAction,
} from '../../../../core/redux/actions';
import {normalizeImageUrl} from '../../../../core/utils/url-utils';

@Component({
  selector: 'app-select-image-modal',
  templateUrl: './select-image-modal.component.html',
  styleUrls: ['./select-image-modal.component.scss']
})
export class SelectImageModalComponent implements OnInit {

  files: File[] = [];

  currentPage = 0;
  numberOfPages = 0;

  constructor(private store: Store, private dialogRef: MatDialogRef<SelectImageModalComponent>) {
  }

  ngOnInit() {
    this.store.select(FileState.files).subscribe(files => {
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

  normalizeUrl(url) {
    return normalizeImageUrl(url);
  }

  nextPageEvent() {
    this.store.dispatch(new NextFilesPageAction());
  }

  previousPageEvent() {
    this.store.dispatch(new PreviousFilesPageAction());
  }

  selectPageEvent(page) {
    this.store.dispatch(new ChangeFilesPageAction(page));
  }
}
