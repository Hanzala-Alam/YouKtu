import { TestBed } from '@angular/core/testing';

import { PlayerServicesService } from './player-services.service';

describe('PlayerServicesService', () => {
  let service: PlayerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
