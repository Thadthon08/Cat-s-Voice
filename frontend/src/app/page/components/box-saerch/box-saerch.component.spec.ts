import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxSaerchComponent } from './box-saerch.component';

describe('BoxSaerchComponent', () => {
  let component: BoxSaerchComponent;
  let fixture: ComponentFixture<BoxSaerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxSaerchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxSaerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
