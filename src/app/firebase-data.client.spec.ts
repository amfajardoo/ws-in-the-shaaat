import { TestBed } from '@angular/core/testing';

import { FirebaseDataClient } from './firebase-data.client';

describe('FirebaseDataClient', () => {
  let service: FirebaseDataClient;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseDataClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
