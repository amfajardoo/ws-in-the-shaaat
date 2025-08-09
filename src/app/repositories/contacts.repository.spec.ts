import { TestBed } from '@angular/core/testing';

import { ContactsRepository } from './contacts.repository';

describe('ContactsRepository', () => {
  let service: ContactsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
