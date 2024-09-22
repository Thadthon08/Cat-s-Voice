import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditActivityComponent } from './form-edit-activity.component';

describe('FormEditActivityComponent', () => {
  let component: FormEditActivityComponent;
  let fixture: ComponentFixture<FormEditActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEditActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
