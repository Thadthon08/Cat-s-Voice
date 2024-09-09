import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHomeComponentU } from './find-home.component';

describe('FindHomeComponentU', () => {
  let component: FindHomeComponentU;
  let fixture: ComponentFixture<FindHomeComponentU>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindHomeComponentU]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindHomeComponentU);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
