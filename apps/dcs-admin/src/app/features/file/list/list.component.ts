import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngxs/store';

import {File} from '../../../core/redux/models';
import {
  ChangeFilesPageAction,
  FetchFilesAction,
  NextFilesPageAction,
  PreviousFilesPageAction
} from '../../../core/redux/actions';
import {FileState} from '../../../core/redux/states';
import {normalizeImageUrl} from '../../../core/utils/url-utils';
import {UploadFileModalComponent} from '../../components/upload-file.modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  files: File[] = [];

  numberOfPages = 0;
  currentPage = 0;

  constructor(private store: Store, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.store.select(FileState.files).subscribe(files => this.files = files);
    this.refreshPage();
    this.store.select(FileState.pageIndicators).subscribe(indicators => {
      if (indicators) {
        this.currentPage = indicators.page;
        this.numberOfPages = Math.ceil(indicators.count / indicators.pageSize);
      }
    });
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '50vh',
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.refreshPage();
      }
    });
  }

  refreshPage() {
    this.store.dispatch(new FetchFilesAction()).subscribe(() => {
    });
  }

  normalizeUrl(url: string) {
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
