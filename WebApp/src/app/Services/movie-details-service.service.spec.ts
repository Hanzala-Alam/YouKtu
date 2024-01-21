import { TestBed } from '@angular/core/testing';

import { MovieDetailsServiceService } from './movie-details-service.service';

describe('MovieDetailsServiceService', () => {
  let service: MovieDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
