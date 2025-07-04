import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { catchError, finalize, map, tap, throwError } from 'rxjs';

import { TableComponent } from '@app/components/table/table.component';
import { TabsComponent } from '@app/components/tabs/tabs.component';
import { IExchange } from '@app/interfaces/exchange.interface';
import { CurrencySymbolPipe } from '@app/pipes/currency-symbol/currency-symbol.pipe';
import { ErrorMessagePipe } from '@app/pipes/error-message/error-message.pipe';
import { ExchangeService } from '@app/services/exchange/exchange.service';
import { LoadingService } from '@app/services/loading/loading.service';
import { GovernmentIdValidator } from '@app/validators/government-id/government-id.validator';
import { MinTotalAmountValidator } from '@app/validators/min-total-amount/min-total-amount.validator';

@Component({
  selector: 'app-order',
  imports: [
    CurrencyPipe,
    CurrencySymbolPipe,
    ErrorMessagePipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    RouterModule,
    TableComponent,
    TabsComponent,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
})
export class OrderComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly loadingService = inject(LoadingService);
  private readonly router = inject(Router);
  private readonly exchangeService = inject(ExchangeService);

  form!: FormGroup;
  data = signal<IExchange[] | null>(null);
  selectedCurrency = signal<IExchange>({} as IExchange);

  exchangeItems = computed(
    () => (this.form?.get('exchangeItems')?.get(this.selectedCurrency()!.id) as FormArray<FormGroup>) || []
  );

  exchangeAmountMap = signal<Record<string, any>>({});
  selectedExchangeAmount = computed(() => this.exchangeAmountMap()[this.selectedCurrency().id] || 0);

  tabs = computed(() => this.data()!.map((item) => ({ label: item.name, value: item.id })));

  ngOnInit(): void {
    this.requestData();
  }

  setActivatedTab(tab: any): void {
    this.selectedCurrency.set(this.data()!.find((item) => item.id === tab.value)!);
  }

  submitToReview() {
    if (this.form.invalid) {
      return;
    }

    this.exchangeService.setOrder(this.form.value);

    this.router.navigate(['/review']);
  }

  private requestData() {
    this.loadingService.isLoading.set(true);

    this.exchangeService
      .requestQuotation()
      .pipe(
        tap((res: any) => {
          this.data.set(res);
          this.selectedCurrency.set(res[0]);
          this.exchangeAmountMap.set(
            res.map((item: any) => ({
              [item.id]: 0,
            }))
          );

          this.setupForm();
        }),
        catchError((error) => {
          this.router.navigate(['/home']);

          return throwError(() => error);
        }),
        finalize(() => this.loadingService.isLoading.set(false))
      )
      .subscribe();
  }

  private setupForm() {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        governmentId: ['', [Validators.required, GovernmentIdValidator()]],
        phone: ['', [Validators.required]],
        exchangeItems: this.fb.group(
          this.data()!.reduce(
            (acc, item) => {
              acc[item.id] = this.fb.array(
                item.faces.map((face) =>
                  this.fb.group({
                    face: [face],
                    currencyName: [item.name],
                    quotation: [item.quotation],
                    quantity: [0],
                  })
                )
              );
              return acc;
            },
            {} as Record<string, FormArray>
          )
        ),
      },
      {
        validators: [MinTotalAmountValidator(100)],
      }
    );

    this.form
      .get('exchangeItems')!
      .valueChanges.pipe(
        map((exchangeItems) => exchangeItems[this.selectedCurrency().id]),
        tap((faces: any[]) => {
          this.exchangeAmountMap.update((currencies: any) => ({
            ...currencies,
            [this.selectedCurrency().id]: faces?.reduce((total: number, item: any) => {
              const amount = item.face * item.quantity;
              return amount + total;
            }, 0),
          }));
        })
      )
      .subscribe();
  }
}
