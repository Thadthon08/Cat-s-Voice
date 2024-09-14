import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditRecoveryComponent } from './form-edit-recovery.component';

describe('FormEditRecoveryComponent', () => {
  let component: FormEditRecoveryComponent;
  let fixture: ComponentFixture<FormEditRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEditRecoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
