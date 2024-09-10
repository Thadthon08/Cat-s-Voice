import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalsCaseTreatmentComponent } from './animals-case-treatment.component';

describe('AnimalsCaseTreatmentComponent', () => {
  let component: AnimalsCaseTreatmentComponent;
  let fixture: ComponentFixture<AnimalsCaseTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalsCaseTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalsCaseTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
