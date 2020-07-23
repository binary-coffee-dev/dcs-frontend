import { TestBed } from '@angular/core/testing';

import { Apollo } from 'apollo-angular';

import { SubscriptionService } from './subscription.service';

class ApolloStub {
}

describe('SubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: Apollo, userClass: ApolloStub}]
  }));

  it('should be created', () => {
    const service: SubscriptionService = TestBed.get(SubscriptionService);
    expect(service).toBeTruthy();
  });
});
