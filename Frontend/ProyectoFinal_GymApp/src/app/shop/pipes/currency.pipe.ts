
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    const symbol = 'ARS'; // Símbolo de moneda para pesos argentinos
    const formattedValue = value.toFixed(2); // Formato de dos decimales

    return symbol + ' ' + formattedValue;
  }
}
