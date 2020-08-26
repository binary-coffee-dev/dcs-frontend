import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import {
  UrlUtilsService,
  MomentService,
  Post,
  PostState
} from '@dcs-libs/shared';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService) {
  }

  ngOnInit(): void {
    this.store.select(PostState.posts).subscribe(posts => {
      this.posts = posts;
    });
  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }
}
