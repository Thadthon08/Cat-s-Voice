import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTreatmentComponent } from './case-treatment.component';

describe('CaseTreatmentComponent', () => {
  let component: CaseTreatmentComponent;
  let fixture: ComponentFixture<CaseTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
