import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInSaerchComponent } from './card-in-saerch.component';

describe('CardInSaerchComponent', () => {
  let component: CardInSaerchComponent;
  let fixture: ComponentFixture<CardInSaerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardInSaerchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInSaerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
