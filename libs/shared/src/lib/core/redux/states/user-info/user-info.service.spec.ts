import { TestBed } from '@angular/core/testing';

import { ApolloTestingModule } from 'apollo-angular/testing';

import { UserInfoService } from './user-info.service';

describe('UserInfoService', () => {
  let service: UserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [UserInfoService]
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(UserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
