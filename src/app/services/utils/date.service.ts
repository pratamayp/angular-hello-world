import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtilService {
  constructor(private datePipe: DatePipe) {}

  format(date: string, formatStr: string = 'dd/MM/yyyy'): string {
    return this.datePipe.transform(new Date(date), formatStr) ?? '';
  }
}
