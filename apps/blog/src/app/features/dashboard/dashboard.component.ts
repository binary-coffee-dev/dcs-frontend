import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { Post, PostState } from '@dcs-libs/shared';

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

  constructor(private store: Store) {
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
