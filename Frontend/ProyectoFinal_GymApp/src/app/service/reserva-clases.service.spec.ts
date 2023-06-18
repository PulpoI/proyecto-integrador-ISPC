import { TestBed } from '@angular/core/testing';

import { ReservaClasesService } from './reserva-clases.service';

describe('ReservaClasesService', () => {
  let service: ReservaClasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaClasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
