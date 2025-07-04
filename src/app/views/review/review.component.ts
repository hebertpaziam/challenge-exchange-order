import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

import { MessageDialogComponent } from '@app/components/message-dialog/message-dialog.component';
import { TableComponent } from '@app/components/table/table.component';
import { ExchangeService } from '@app/services/exchange/exchange.service';

@Component({
  selector: 'app-review',
  imports: [MatButtonModule, MatCardModule, TableComponent, CurrencyPipe, RouterModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  private readonly router = inject(Router);
  private readonly exchangeService = inject(ExchangeService);
  private readonly dialog = inject(MatDialog);

  order = computed(() => this.exchangeService.order());

  orderItems = computed(() =>
    Object.entries(this.order()!.exchangeItems).flatMap(([currencyCode, items]) =>
      items
        .filter((item) => item.quantity > 0)
        .map((item) => ({
          currencyCode,
          currencyName: item.currencyName,
          face: item.face,
          quantity: item.quantity,
          total: item.face * item.quantity,
          totalBRL: item.face * item.quantity * item.quotation,
        }))
    )
  );

  orderAmount = computed(() => this.orderItems().reduce((total: number, item: any) => item.totalBRL + total, 0));

  submitOrder() {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: {
        title: `Pedido Realizado, ${this.order()!.name}!`,
        text: `Em breve receberá um e-mail com o resumo do seu pedido.`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(tap(() => this.router.navigate(['/home'])))
      .subscribe();
  }
}
