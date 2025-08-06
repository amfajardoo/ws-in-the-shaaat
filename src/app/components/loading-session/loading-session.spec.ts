import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSession } from './loading-session';

describe('LoadingSession', () => {
  let component: LoadingSession;
  let fixture: ComponentFixture<LoadingSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
