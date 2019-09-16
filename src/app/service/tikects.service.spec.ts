import { TestBed } from '@angular/core/testing';

import { TikectsService } from './tikects.service';

describe('TikectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TikectsService = TestBed.get(TikectsService);
    expect(service).toBeTruthy();
  });
});
