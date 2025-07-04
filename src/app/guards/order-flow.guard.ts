import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { ExchangeService } from '@app/services/exchange/exchange.service';

export const orderFlowGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const exchangeService = inject(ExchangeService);

  const order = exchangeService.order();

  if (['order', 'review'].includes(segments[0]?.path) && !order) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
