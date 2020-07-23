import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Apollo } from 'apollo-angular';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { FileService } from './file.service';

class ApolloStub {
}

describe('FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [FileService, {provide: Apollo, useClass: ApolloStub}, {provide: ENVIRONMENT, useValue: {}}],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FileService = TestBed.get(FileService);
    expect(service).toBeTruthy();
  });
});
