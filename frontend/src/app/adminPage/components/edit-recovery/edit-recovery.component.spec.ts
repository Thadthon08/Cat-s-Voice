import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecoveryComponent } from './edit-recovery.component';

describe('EditRecoveryComponent', () => {
  let component: EditRecoveryComponent;
  let fixture: ComponentFixture<EditRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRecoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
