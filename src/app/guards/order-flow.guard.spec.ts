import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CanMatchFn, provideRouter, Router } from '@angular/router';

import { ExchangeService } from '@app/services/exchange/exchange.service';

import { orderFlowGuard } from './order-flow.guard';

describe('orderFlowGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => orderFlowGuard(...guardParameters));

  let exchangeService: ExchangeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideRouter([]), provideHttpClient()],
    });

    exchangeService = TestBed.inject(ExchangeService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if order exists', () => {
    exchangeService.setOrder({} as any);
    const canMatch = executeGuard({} as any, [{ path: 'order' }] as any);
    expect(canMatch).toBe(true);
  });

  it('should not allow navigation if order does not exist', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    exchangeService.setOrder(null as any);
    const canMatch = executeGuard({} as any, [{ path: 'order' }] as any);
    expect(canMatch).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
