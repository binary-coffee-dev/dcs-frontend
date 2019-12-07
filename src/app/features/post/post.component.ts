import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {PostState} from '../../core/redux/states';
import {Post} from '../../core/redux/models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(PostState.post).subscribe((post: Post) => this.post = post);
  }

}
