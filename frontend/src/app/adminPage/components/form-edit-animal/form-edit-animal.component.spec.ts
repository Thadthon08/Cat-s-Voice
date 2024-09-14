import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditAnimalComponent } from './form-edit-animal.component';

describe('FormEditAnimalComponent', () => {
  let component: FormEditAnimalComponent;
  let fixture: ComponentFixture<FormEditAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEditAnimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
