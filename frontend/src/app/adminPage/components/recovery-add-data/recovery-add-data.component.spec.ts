import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryAddDataComponent } from './recovery-add-data.component';

describe('RecoveryAddDataComponent', () => {
  let component: RecoveryAddDataComponent;
  let fixture: ComponentFixture<RecoveryAddDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecoveryAddDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
