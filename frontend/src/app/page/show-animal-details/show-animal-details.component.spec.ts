import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnimalDetailsComponent } from './show-animal-details.component';

describe('ShowAnimalDetailsComponent', () => {
  let component: ShowAnimalDetailsComponent;
  let fixture: ComponentFixture<ShowAnimalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowAnimalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAnimalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
