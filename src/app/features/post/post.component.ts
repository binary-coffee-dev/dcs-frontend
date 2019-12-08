import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {PostState} from '../../core/redux/states';
import {Post} from '../../core/redux/models';
import {MomentService, ResourceService} from '../../core/services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(
    private store: Store,
    public moment: MomentService,
    public resource: ResourceService
  ) {
  }

  ngOnInit() {
    this.store.select(PostState.post).subscribe((post: Post) => this.post = post);
  }

}
