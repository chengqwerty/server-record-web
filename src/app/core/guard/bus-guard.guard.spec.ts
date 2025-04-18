import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { busGuardGuard } from './bus-guard.guard';

describe('busGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => busGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
