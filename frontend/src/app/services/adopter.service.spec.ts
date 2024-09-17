import { TestBed } from '@angular/core/testing';

import { AdopterService } from './adopter.service';

describe('AdopterService', () => {
  let service: AdopterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdopterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
