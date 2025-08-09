import { TestBed } from '@angular/core/testing';

import { UsersRepository } from './users.repository';

describe('UsersRepository', () => {
  let service: UsersRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
