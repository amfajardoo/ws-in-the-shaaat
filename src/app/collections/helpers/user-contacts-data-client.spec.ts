import { TestBed } from '@angular/core/testing';

import { UserContactsDataClient } from './user-contacts-data-client';

describe('UserContactsDataClient', () => {
  let service: UserContactsDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserContactsDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
