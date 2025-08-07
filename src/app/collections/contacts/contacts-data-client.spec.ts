import { TestBed } from '@angular/core/testing';

import { ContactsDataClient } from './contacts-data-client';

describe('ContactsDataClient', () => {
  let service: ContactsDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
