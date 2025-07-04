import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environment';
import { map, Observable } from 'rxjs';

import { IExchange } from '@app/interfaces/exchange.interface';
import { IOrder } from '@app/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  private http = inject(HttpClient);
  private readonly _order = signal<IOrder | null>(null);

  order = computed(() => this._order());

  setOrder(order: IOrder): void {
    this._order.set(order);
  }

  requestQuotation(): Observable<IExchange[]> {
    return this.http.get<any[]>(`${environment.API_URL}/moedas`).pipe(
      map((res) =>
        res.map(
          (item) =>
            ({
              id: item.id,
              name: item.nome,
              quotation: item.cotacao,
              faces: item.faces,
            }) as IExchange
        )
      )
    );
  }
}
