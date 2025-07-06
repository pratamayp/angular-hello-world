import { Injectable } from '@angular/core';
import { Todo } from '../todo/table/table.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // Title state (sederhana karena 1 value)
  private _title: string = '';

  // Todo list state
  private _todoData = new BehaviorSubject<Todo[]>([]);
  public todo$ = this._todoData.asObservable();

  constructor() {}

  // Title
  set title(value: string) {
    this._title = value;
  }

  get title(): string {
    return this._title;
  }

  // Todo
  addTodo(todo: Todo): void {
    const current = this._todoData.value;
    this._todoData.next([...current, todo]);
  }

  deleteTodo(id: number): void {
    const filtered = this._todoData.value.filter((item) => item.id !== id);
    this._todoData.next(filtered);
  }

  getTodoSnapshot(): Todo[] {
    return this._todoData.value;
  }
}
