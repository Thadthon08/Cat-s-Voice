import { TestBed } from '@angular/core/testing';

import { AnimalNoAuthService } from './animal-no-auth.service';

describe('AnimalNoAuthService', () => {
  let service: AnimalNoAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalNoAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
