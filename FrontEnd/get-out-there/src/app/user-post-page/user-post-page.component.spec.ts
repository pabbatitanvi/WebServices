import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostPageComponent } from './user-post-page.component';

describe('UserPostPageComponent', () => {
  let component: UserPostPageComponent;
  let fixture: ComponentFixture<UserPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPostPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
