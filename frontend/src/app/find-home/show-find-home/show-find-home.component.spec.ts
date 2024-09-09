import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFindHomeComponent } from './show-find-home.component';

describe('ShowFindHomeComponent', () => {
  let component: ShowFindHomeComponent;
  let fixture: ComponentFixture<ShowFindHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowFindHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFindHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
