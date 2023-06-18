import { TestBed } from '@angular/core/testing';

import { MisClasesService } from './mis-clases.service';

describe('MisClasesService', () => {
  let service: MisClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
