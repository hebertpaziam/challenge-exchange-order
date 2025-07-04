import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(currencyCode: string): string {
    return (
      Intl.NumberFormat('pt-BR', { style: 'currency', currency: currencyCode })
        .formatToParts()
        .find((part) => part.type === 'currency')?.value || ''
    );
  }
}
