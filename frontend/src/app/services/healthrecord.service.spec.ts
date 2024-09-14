import { TestBed } from '@angular/core/testing';

import { HealthrecordService } from './healthrecord.service';

describe('HealthrecordService', () => {
  let service: HealthrecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthrecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
