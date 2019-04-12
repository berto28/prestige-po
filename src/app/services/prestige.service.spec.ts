import { TestBed } from '@angular/core/testing';

import { PrestigeService } from './prestige.service';

describe('PrestigeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrestigeService = TestBed.get(PrestigeService);
    expect(service).toBeTruthy();
  });
});
