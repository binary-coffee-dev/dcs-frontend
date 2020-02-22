import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output()
  nextPageEvent = new EventEmitter();
  @Output()
  previousPageEvent = new EventEmitter();
  @Output()
  pageEvent = new EventEmitter<number>();

  private _currentPage: number = 0;
  private _numberOfPages: number = 0;
  @Input()
  showPages = 2;

  pages = [];

  get numberOfPages(): number {
    return this._numberOfPages;
  }

  @Input()
  set numberOfPages(value: number) {
    this._numberOfPages = value;
    this.calculatePages();
  }

  get currentPage(): number {
    return this._currentPage;
  }

  @Input()
  set currentPage(value: number) {
    this._currentPage = value;
    this.calculatePages();
  }

  constructor() {
  }

  calculatePages() {
    if (this.numberOfPages > 0 && typeof this.currentPage === 'number') {
      const pages = [];
      for (let i = Math.max(this.currentPage - this.showPages, 0); i < this.currentPage; i++) {
        pages.push(i);
      }
      for (let i = this.currentPage; i < Math.min(this.currentPage + this.showPages + 1, this.numberOfPages); i++) {
        pages.push(i);
      }
      this.pages = pages;
    }
  }
}
