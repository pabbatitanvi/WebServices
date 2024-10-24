import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoShareFormComponent } from './info-share-form.component';

describe('InfoShareFormComponent', () => {
  let component: InfoShareFormComponent;
  let fixture: ComponentFixture<InfoShareFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoShareFormComponent]
    });
    fixture = TestBed.createComponent(InfoShareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
