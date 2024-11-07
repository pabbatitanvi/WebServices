import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendScreenComponent } from './friend-screen.component';

describe('FriendScreenComponent', () => {
  let component: FriendScreenComponent;
  let fixture: ComponentFixture<FriendScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
