import { TestBed } from '@angular/core/testing';

import { MaterializeService } from './materialize.service';

describe('MaterializeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterializeService = TestBed.get(MaterializeService);
    expect(service).toBeTruthy();
  });
});
