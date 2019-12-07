import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Store} from '@ngxs/store';
import {FetchPostAction} from '../../core/redux/actions';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private store: Store, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchPostAction(this.activatedRoute.snapshot.paramMap.get('id')));
  }

}
