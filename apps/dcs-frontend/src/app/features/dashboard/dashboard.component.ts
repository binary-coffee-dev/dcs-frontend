import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { PostState } from '../../core/redux/states';
import { Post } from '../../core/redux/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  numbers: number[] = [];

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(PostState.posts).subscribe((posts) => {
      this.posts = posts;
      for (let index = 1; index < posts.length * 10; index++) {
        this.numbers[index] = index;
      }
    });
  }
}
