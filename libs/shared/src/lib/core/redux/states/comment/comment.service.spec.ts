import { TestBed } from '@angular/core/testing';

import { Apollo } from 'apollo-angular';

import { CommentService } from './comment.service';

class ApolloStub {
}

describe('CommentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CommentService,
      {provide: Apollo, userClass: ApolloStub}
    ]
  }));

  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });
});
