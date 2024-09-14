import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumrakComponent } from './aumrak.component';

describe('AumrakComponent', () => {
  let component: AumrakComponent;
  let fixture: ComponentFixture<AumrakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AumrakComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AumrakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
