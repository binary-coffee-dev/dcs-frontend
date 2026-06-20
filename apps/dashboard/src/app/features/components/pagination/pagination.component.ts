import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false
})
export class PaginationComponent {
  showPages = input<number>(2);
  numberOfPages = input<number>(0);
  currentPage = input<number>(0);
  pages = signal<number[]>([]);

  nextPageEvent = output<boolean>();
  previousPageEvent = output<boolean>();
  pageEvent = output<number>();

  constructor() {
    effect(() => {
      this.numberOfPages();
      this.currentPage();
      this.calculatePages();
    });
  }

  goToFirstPage() {
    this.pageEvent.emit(0);
  }

  goToLastPage() {
    this.pageEvent.emit(this.numberOfPages() - 1);
  }

  calculatePages() {
    if (this.numberOfPages() > 0 && typeof this.currentPage() === 'number') {
      const pages = [];
      for (
        let i = Math.max(this.currentPage() - this.showPages(), 0);
        i < this.currentPage();
        i++
      ) {
        pages.push(i);
      }
      for (
        let i = this.currentPage();
        i < Math.min(this.currentPage() + this.showPages() + 1, this.numberOfPages());
        i++
      ) {
        pages.push(i);
      }
      this.pages.set(pages);
    }
  }
}
