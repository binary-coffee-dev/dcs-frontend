import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

import { Store } from '@ngxs/store';

import { Post, PostState } from '@dcs-libs/shared';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  numbers: number[] = [];
  currentPage = 0;
  pageSize = 0;
  isBrowser = false;

  constructor(private store: Store, @Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.store.select(PostState.posts).subscribe((posts) => {
      if (posts) {
        this.posts = posts;
        for (let index = 1; index < posts.length * 10; index++) {
          this.numbers[index] = index;
        }
      }
    });
    this.store.select(PostState.pageIndicator).subscribe(indicator => {
      this.currentPage = indicator.page || 0;
      this.pageSize = indicator.pageSize || 0;
    });
  }
}
