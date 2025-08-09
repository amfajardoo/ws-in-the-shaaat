import { TestBed } from '@angular/core/testing';

import { ChatsRepository } from './chats.repository';

describe('ChatsRepository', () => {
  let service: ChatsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
