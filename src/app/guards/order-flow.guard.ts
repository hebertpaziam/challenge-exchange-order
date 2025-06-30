import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { CheckoutService } from '@app/services/checkout.service';

export const orderFlowGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const checkoutService = inject(CheckoutService);

  const bankNotes = checkoutService.allBankNotes();

  if (['order', 'review'].includes(segments[0]?.path) && !bankNotes.length) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};
