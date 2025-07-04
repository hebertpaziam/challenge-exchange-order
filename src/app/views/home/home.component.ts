import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { CheckoutService } from '@app/services/checkout.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  checkoutService = inject(CheckoutService);

  ngOnInit(): void {
    this.checkoutService.setBankNotes([]);
  }
}
