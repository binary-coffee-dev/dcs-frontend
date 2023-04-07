import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Tag } from '../../models';
import { TAGS_QUERY } from '../../../graphql/queries';

@Injectable()
export class TagService {
  constructor(private apollo: Apollo) {
  }

  fetchTags(): Observable<Tag[]> {
    return this.apollo
      .query({query: TAGS_QUERY})
      .pipe(map((result: any) => result.data.tags));
  }
}
