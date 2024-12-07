import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEventComponent } from './share-event.component';

describe('ShareEventComponent', () => {
  let component: ShareEventComponent;
  let fixture: ComponentFixture<ShareEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
