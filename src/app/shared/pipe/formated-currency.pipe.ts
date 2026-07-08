import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    currency = 'IDR',
    locale = 'id-ID',
    minimumFractionDigits = 2,
    maximumFractionDigits = 2
  ): string {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(Number(value));
  }
}
