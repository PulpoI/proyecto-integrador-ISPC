import { TestBed } from '@angular/core/testing';

import { LoginAdminService } from './login-admin.service';

describe('LoginAdminService', () => {
  let service: LoginAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
