import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import {
  UrlUtilsService,
  MomentService,
  Post,
  PostState, User
} from '@dcs-libs/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user = {} as User;
  posts: Post[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    console.log(this.user);
    this.store.select(PostState.posts).subscribe(posts => {
      this.posts = posts;
    });
  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }
}
