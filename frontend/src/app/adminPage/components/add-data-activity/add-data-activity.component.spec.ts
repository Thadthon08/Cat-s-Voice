import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataActivityComponent } from './add-data-activity.component';

describe('AddDataActivityComponent', () => {
  let component: AddDataActivityComponent;
  let fixture: ComponentFixture<AddDataActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDataActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDataActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
