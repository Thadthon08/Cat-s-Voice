import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalManagementComponent } from './animal-management.component';

describe('AnimalManagementComponent', () => {
  let component: AnimalManagementComponent;
  let fixture: ComponentFixture<AnimalManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
