import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { SharedService } from '../../services/shared.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export type Todo = {
  id: number;
  title: string;
  deadline: Date;
};

@Component({
  selector: 'todo-table',
  imports: [MatTableModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  constructor(private shared: SharedService) {}
  @Output() edit = new EventEmitter<Todo>();

  displayedColumns: string[] = ['id', 'title', 'deadline', 'action'];
  dataSource: Todo[] = [];

  getTodo() {
    this.shared.todo$.subscribe((data) => {
      this.dataSource = data;
    });
  }

  ngOnInit(): void {
    this.getTodo();
  }

  handleEdit(todo: Todo) {
    this.edit.emit(todo);
  }
  handleDelete(id: number) {
    this.shared.deleteTodo(id);
  }
}
