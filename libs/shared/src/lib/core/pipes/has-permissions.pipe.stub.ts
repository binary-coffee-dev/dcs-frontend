import {Pipe, PipeTransform} from '@angular/core';

import {Observable, of} from 'rxjs';

import {Permission} from '../permissions';

@Pipe({
  name: 'hasPermissions'
})
export class HasPermissionsPipeStub implements PipeTransform {

  constructor() {
  }

  transform(permissions: Permission[]): Observable<boolean> {
    return of(true);
  }
}
