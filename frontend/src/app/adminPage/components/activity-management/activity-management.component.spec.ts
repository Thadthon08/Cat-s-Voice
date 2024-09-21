import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityManagementComponent } from './activity-management.component';

describe('ActivityManagementComponent', () => {
  let component: ActivityManagementComponent;
  let fixture: ComponentFixture<ActivityManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
