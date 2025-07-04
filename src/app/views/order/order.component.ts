import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { TableComponent } from '@app/components/table/table.component';
import { TabsComponent } from '@app/components/tabs/tabs.component';
import { BankNoteTypeEnum } from '@app/enums/banknote.enum';
import { CurrencySymbolPipe } from '@app/pipes/currency-symbol/currency-symbol.pipe';
import { CheckoutService } from '@app/services/checkout.service';

@Component({
  selector: 'app-order',
  imports: [
    CurrencyPipe,
    CurrencySymbolPipe,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule,
    TableComponent,
    TabsComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent {
  private readonly fb = inject(FormBuilder);
  private readonly checkoutService = inject(CheckoutService);

  readonly faces = signal([5, 10, 20, 50, 100]);
  readonly tabs = signal([
    { label: 'Dólar', value: BankNoteTypeEnum.DOLLAR },
    { label: 'Euro', value: BankNoteTypeEnum.EURO },
    { label: 'Libra Esterlina', value: BankNoteTypeEnum.POUND_STERLING },
  ]);
  readonly tabActivated = signal(this.tabs()[0]);

  readonly currencies = signal([BankNoteTypeEnum.DOLLAR, BankNoteTypeEnum.EURO, BankNoteTypeEnum.POUND_STERLING]);
  readonly selectedCurrency = computed<BankNoteTypeEnum>(() => this.tabActivated().value);

  readonly exchangeItems = computed(
    () => this.form.get('exchangeItems')?.get(this.selectedCurrency()) as FormArray<FormGroup>
  );
  readonly quotation = computed(() => this.checkoutService.quoteMap()[this.selectedCurrency()] || 0);

  readonly form = this.fb.group({
    name: [],
    email: [],
    governmentId: [],
    phone: [],
    exchangeItems: this.fb.group(this.buildExchangeItems()),
  });

  setActivatedTab(tab: any): void {
    this.tabActivated.set(tab);
  }

  private buildExchangeItems(): Record<string, FormArray> {
    const exchangeItems: Record<string, FormArray> = {};

    this.currencies().forEach((currency) => {
      exchangeItems[currency] = this.fb.array(
        this.faces().map((face) =>
          this.fb.group({
            face: [face],
            quantity: [],
          })
        )
      );
    });

    return exchangeItems;
  }
}
