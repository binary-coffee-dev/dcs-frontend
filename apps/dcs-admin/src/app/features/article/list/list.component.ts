import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {Post} from '../../../core/redux/models';
import {PostState} from '../../../core/redux/states';
import {
  FetchPostsAction,
  NextPageAction,
  PreviousPageAction,
  SelectPageAction
} from '../../../core/redux/actions';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  posts: Post[];

  currentPage = 0;
  numberOfPages = 0;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(PostState.posts).subscribe((posts) => {
      this.posts = posts || [];
    });
    this.store.dispatch(new FetchPostsAction());
    this.store.select(PostState.pageIndicator).subscribe(indicator => {
      if (indicator) {
        this.currentPage = indicator.page;
        this.numberOfPages = Math.ceil(indicator.count / indicator.pageSize);
      }
    });
  }

  nextPageEvent() {
    this.store.dispatch(new NextPageAction());
  }

  previousPageEvent() {
    this.store.dispatch(new PreviousPageAction());
  }

  selectPageEvent(page) {
    this.store.dispatch(new SelectPageAction(page));
  }

  openArticle(post: Post) {
    window.open(`${environment.siteUrl}/post/${post.name}`);
  }
}
