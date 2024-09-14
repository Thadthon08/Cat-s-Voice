import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumrakDetailsComponent } from './aumrak-details.component';

describe('AumrakDetailsComponent', () => {
  let component: AumrakDetailsComponent;
  let fixture: ComponentFixture<AumrakDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AumrakDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AumrakDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
