import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';

import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {map} from 'rxjs/operators';

import {FetchPostsAction} from '../../../core/redux/actions';
import {PostState} from '../../../core/redux/states';
import {Post} from '../../../core/redux/models';

@Injectable()
export class PostsResolver implements Resolve<Observable<Post[]>> {
  constructor(private store: Store) {}

  resolve(): Observable<Post[]> {
    return this.store.dispatch(new FetchPostsAction()).pipe(map(() => {
      return this.store.selectSnapshot<Post[]>(PostState.posts);
    }));
  }
}
