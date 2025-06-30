import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { orderFlowGuard } from './order-flow.guard';

describe('orderFlowGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderFlowGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
