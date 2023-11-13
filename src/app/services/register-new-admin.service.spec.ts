import { TestBed } from '@angular/core/testing';

import { RegisterNewAdminService } from './register-new-admin.service';

describe('RegisterNewAdminService', () => {
  let service: RegisterNewAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterNewAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
