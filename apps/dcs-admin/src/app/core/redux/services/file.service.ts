import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';

import {FILES_QUERY} from '../../graphql/queries';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {File as FileModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private apollo: Apollo, private http: HttpClient) {
  }

  fetchFiles(limit, start = 0) {
    return this.apollo
      .watchQuery({query: FILES_QUERY, variables: {limit, start}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.uploadsConnection));
  }

  uploadFile(file: File, name: string = null): Observable<FileModel> {
    const formData = new FormData();
    formData.append('files', file, name);
    return this.http.post<FileModel>(`${environment.apiUrl}upload`, formData).pipe(map(response => response[0]));
  }
}
