import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Tag } from '../../models';
import { TAGS_QUERY } from '../../../graphql/queries';
import {UpdateResponseService} from "../../../services/update-response.service";

@Injectable()
export class TagService {
  private apollo = inject(Apollo);
  private responseService = inject(UpdateResponseService);


  fetchTags(): Observable<Tag[]> {
    return this.apollo
      .query({query: TAGS_QUERY})
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.tags));
  }
}
