import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryManagementComponent } from './recovery-management.component';

describe('RecoveryManagementComponent', () => {
  let component: RecoveryManagementComponent;
  let fixture: ComponentFixture<RecoveryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
