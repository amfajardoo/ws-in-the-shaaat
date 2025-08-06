import { TestBed } from '@angular/core/testing';

import { UsersDataClient } from './users-data-client';

describe('UsersDataClient', () => {
  let service: UsersDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
