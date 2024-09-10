import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterFormComponent } from './adopter-form.component';

describe('AdopterFormComponent', () => {
  let component: AdopterFormComponent;
  let fixture: ComponentFixture<AdopterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdopterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdopterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
