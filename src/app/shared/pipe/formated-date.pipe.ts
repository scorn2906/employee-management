import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class IndonesiaDatePipe implements PipeTransform {

  transform(value: string | Date | null | undefined): string {

    if (!value) return '-';

    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));

  }
}
