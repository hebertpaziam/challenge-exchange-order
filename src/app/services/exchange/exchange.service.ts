import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environment';
import { map, Observable, of } from 'rxjs';

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
    return of([
      {
        id: 'USD',
        nome: 'Dolár Americano',
        cotacao: 5.48,
        faces: [1, 2, 5, 10, 20, 50, 100],
      },
      {
        id: 'EUR',
        nome: 'Euro',
        cotacao: 6.1,
        faces: [5, 10, 20, 50, 100, 200, 500],
      },
      {
        id: 'GBP',
        nome: 'Libra',
        cotacao: 7.29,
        faces: [5, 10, 20, 50],
      },
      {
        id: 'ARS',
        nome: 'Pesos Argentinos',
        cotacao: 0.0057,
        faces: [10, 20, 50, 100, 200, 500, 1000],
      },
    ]).pipe(
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
