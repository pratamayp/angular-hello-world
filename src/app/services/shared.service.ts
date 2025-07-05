import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private _title: string = '';

  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  constructor() {}
}
