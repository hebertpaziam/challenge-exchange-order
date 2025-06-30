import { computed, Injectable, signal } from '@angular/core';

import { BankNoteTypeEnum } from '@app/enums/banknote.enum';
import { IBanknote } from '@app/interface/banknote.interface';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private bankNotes = signal<IBanknote[]>([]);
  private quoteMap: Record<BankNoteTypeEnum, number> = {
    [BankNoteTypeEnum.DOLLAR]: 5.0,
    [BankNoteTypeEnum.EURO]: 5.5,
    [BankNoteTypeEnum.POUND_STERLING]: 6.0,
  };

  allBankNotes = computed(() => this.bankNotes());

  dollarBankNotes = computed(() => this.bankNotes().filter((bankNote) => bankNote.type === BankNoteTypeEnum.DOLLAR));
  euroBankNotes = computed(() => this.bankNotes().filter((bankNote) => bankNote.type === BankNoteTypeEnum.EURO));
  poundSterlingBanknotes = computed(() =>
    this.bankNotes().filter((bankNote) => bankNote.type === BankNoteTypeEnum.POUND_STERLING)
  );
}
