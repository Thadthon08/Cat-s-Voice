import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SterilizationProgramComponent } from './sterilization-program.component';

describe('SterilizationProgramComponent', () => {
  let component: SterilizationProgramComponent;
  let fixture: ComponentFixture<SterilizationProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SterilizationProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SterilizationProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
