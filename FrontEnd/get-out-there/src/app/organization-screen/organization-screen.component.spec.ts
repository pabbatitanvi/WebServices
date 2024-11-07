import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationScreenComponent } from './organization-screen.component';

describe('OrganizationScreenComponent', () => {
  let component: OrganizationScreenComponent;
  let fixture: ComponentFixture<OrganizationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
