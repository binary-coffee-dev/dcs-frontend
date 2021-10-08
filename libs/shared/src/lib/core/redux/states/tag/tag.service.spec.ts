import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';
import { Apollo } from 'apollo-angular';

class ApolloStub {
}

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TagService,
      {provide: Apollo, useClass: ApolloStub}
    ]
  }));

  beforeEach(() => {
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
