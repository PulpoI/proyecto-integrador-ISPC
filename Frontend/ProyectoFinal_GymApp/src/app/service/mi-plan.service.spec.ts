import { TestBed } from '@angular/core/testing';

import { MiPlanService } from './mi-plan.service';

describe('MiPlanService', () => {
  let service: MiPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
