import { computed, effect, Injectable, signal } from '@angular/core';
import { environment } from '@environment';

import { BankNoteTypeEnum } from '@app/enums/banknote.enum';
import { IBanknote } from '@app/interface/banknote.interface';
import { JSONStorage } from '@app/utils/storage/storage.util';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private bankNotes = signal<IBanknote[] | null>(
    JSONStorage.getItem<IBanknote[]>(`${environment.STORAGE_KEY}@bank-notes`) || null
  );

  private quoteMap: Record<BankNoteTypeEnum, number> = {
    [BankNoteTypeEnum.DOLLAR]: 5.41,
    [BankNoteTypeEnum.EURO]: 6.37,
    [BankNoteTypeEnum.POUND_STERLING]: 7.38,
  };

  allBankNotes = computed(() => this.bankNotes());

  dollarBankNotes = computed(
    () => this.bankNotes()?.filter((bankNote) => bankNote.type === BankNoteTypeEnum.DOLLAR) || []
  );
  euroBankNotes = computed(() => this.bankNotes()?.filter((bankNote) => bankNote.type === BankNoteTypeEnum.EURO) || []);
  poundSterlingBanknotes = computed(
    () => this.bankNotes()?.filter((bankNote) => bankNote.type === BankNoteTypeEnum.POUND_STERLING) || []
  );

  constructor() {
    effect(() => {
      JSONStorage.setItem(`${environment.STORAGE_KEY}@bank-notes`, this.bankNotes());
    });
  }

  setBankNotes(bankNotes: IBanknote[]): void {
    this.bankNotes.set(bankNotes);
  }
}
