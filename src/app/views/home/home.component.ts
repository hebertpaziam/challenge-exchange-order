import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { IOrder } from '@app/interfaces/order.interface';
import { ExchangeService } from '@app/services/exchange/exchange.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  checkoutService = inject(ExchangeService);

  ngOnInit(): void {
    this.checkoutService.setOrder({} as IOrder);
  }
}
