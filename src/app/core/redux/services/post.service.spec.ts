import {TestBed} from '@angular/core/testing';
import {Apollo} from 'apollo-angular';

import {PostService} from './post.service';

class ApolloStub {
}

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostService,
      {provide: Apollo, useClass: ApolloStub}
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(PostService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
