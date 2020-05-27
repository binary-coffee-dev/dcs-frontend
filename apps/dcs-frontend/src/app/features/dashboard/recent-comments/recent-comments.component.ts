import { Component, OnInit } from '@angular/core';

import {Store} from '@ngxs/store';

import {Comment, CommentState} from '@dcs-libs/shared';

@Component({
  selector: 'app-recent-comments',
  templateUrl: './recent-comments.component.html',
  styleUrls: ['./recent-comments.component.scss']
})
export class RecentCommentsComponent implements OnInit {

  comments: Comment[] = [];

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(CommentState.recentComments).subscribe(comments => {
      this.comments = comments || [];
      console.log(comments);
    });
  }
}
