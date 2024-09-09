import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDataFromSearchComponent } from './get-data-from-search.component';

describe('GetDataFromSearchComponent', () => {
  let component: GetDataFromSearchComponent;
  let fixture: ComponentFixture<GetDataFromSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetDataFromSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDataFromSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
