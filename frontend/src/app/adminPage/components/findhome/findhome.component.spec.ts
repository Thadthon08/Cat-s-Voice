import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindhomeComponent } from './findhome.component';

describe('FindhomeComponent', () => {
  let component: FindhomeComponent;
  let fixture: ComponentFixture<FindhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
