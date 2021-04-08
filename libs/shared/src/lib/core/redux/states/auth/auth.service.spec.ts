import { TestBed } from '@angular/core/testing';

import { Apollo } from 'apollo-angular';

import { AuthService } from './auth.service';

class ApolloStub {
}

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [AuthService, {provide: Apollo, useClass: Apollo}]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
