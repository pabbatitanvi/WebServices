import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayComponentComponent } from './display-component.component';

describe('DisplayComponentComponent', () => {
  let component: DisplayComponentComponent;
  let fixture: ComponentFixture<DisplayComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayComponentComponent]
    });
    fixture = TestBed.createComponent(DisplayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
