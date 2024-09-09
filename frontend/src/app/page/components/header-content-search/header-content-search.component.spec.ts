import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContentSearchComponent } from './header-content-search.component';

describe('HeaderContentSearchComponent', () => {
  let component: HeaderContentSearchComponent;
  let fixture: ComponentFixture<HeaderContentSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderContentSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderContentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
