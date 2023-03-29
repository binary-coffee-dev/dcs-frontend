import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FILES_QUERY } from '../../../graphql/queries';
import { File, File as FileModel } from '../../models';
import { ENVIRONMENT, Environment } from '../../../models';
import { ResponseData } from '../pagination-base.class';
import { RemoveFileAction } from './file.action';
import { REMOVE_IMAGE_MUTATION } from '../../../graphql/mutations';

@Injectable()
export class FileService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
  }

  fetchFiles(limit: number, start = 0, where = {}): Observable<ResponseData> {
    return this.apollo
      .query({query: FILES_QUERY, variables: {limit, start, where}, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => ({
        ...result.data.imagesConnection,
        values: result.data.imagesConnection.values.map((elem: any) => elem.image.length > 0 ? elem.image[0] : null).filter((v: any) => !!v)
      })));
  }

  uploadFile(file: File, name: string | null = null): Observable<FileModel> {
    const formData = new FormData();
    // @ts-ignore
    formData.append('files', file, name);
    return this.http.post<any>(`${this.environment.apiUrl}upload`, formData).pipe(map(response => response[0]));
  }

  removeFileAction(id: string) {
    return this.apollo
      .mutate({mutation: REMOVE_IMAGE_MUTATION, variables: {id}});
  }
}
