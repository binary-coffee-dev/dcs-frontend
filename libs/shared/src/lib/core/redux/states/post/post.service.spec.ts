import { TestBed } from '@angular/core/testing';

import { Apollo } from 'apollo-angular';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { PostService } from './post.service';

class ApolloStub {
}

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PostService, {provide: Apollo, useClass: ApolloStub}, {provide: ENVIRONMENT, useValue: {}}]
  }));

  it('should be created', () => {
    const service: PostService = TestBed.inject(PostService);
    expect(service).toBeTruthy();
  });
});
