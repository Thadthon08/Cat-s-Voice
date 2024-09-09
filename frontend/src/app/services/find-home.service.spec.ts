import { TestBed } from '@angular/core/testing';

import { FindHomeService } from './find-home.service';

describe('FindHomeService', () => {
  let service: FindHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
