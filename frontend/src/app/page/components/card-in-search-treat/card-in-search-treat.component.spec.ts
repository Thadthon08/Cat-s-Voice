import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInSearchTreatComponent } from './card-in-search-treat.component';

describe('CardInSearchTreatComponent', () => {
  let component: CardInSearchTreatComponent;
  let fixture: ComponentFixture<CardInSearchTreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInSearchTreatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInSearchTreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
