import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Apollo } from 'apollo-angular';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FILES_QUERY } from '../../../graphql/queries';
import { File, File as FileModel } from '../../models';
import { ENVIRONMENT, Environment } from '../../../models';
import { ResponseData } from '../pagination-base.class';
import { REMOVE_IMAGE_MUTATION } from '../../../graphql/mutations';
import { UpdateResponseService } from '../../../services/update-response.service';

@Injectable()
export class FileService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment,
    private responseService: UpdateResponseService
  ) {
  }

  fetchFiles(limit: number, start = 0, filters = {}): Observable<ResponseData> {
    return this.apollo
      .query({ query: FILES_QUERY, variables: { limit, start, filters }, fetchPolicy: 'no-cache' })
      .pipe(
        map(res => this.responseService.formatResponseObjects(res)),
        map((result: any) => ({
          aggregate: { count: result.data.meta_images.pagination.total },
          values: result.data.images.map((elem: any) => elem.image).filter((v: any) => !!v)
        }))
      );
  }

  uploadFile(file: File, name: string | null = null): Observable<FileModel> {
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', file, name);
    return this.http.post<any>(`${this.environment.apiUrl}api/upload`, formData).pipe(map(response => response[0]));
  }

  removeFileAction(id: string) {
    return this.apollo
      .mutate({ mutation: REMOVE_IMAGE_MUTATION, variables: { id } });
  }
}
