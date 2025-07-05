import { Component, inject } from '@angular/core';
import { TableComponent } from './table/table.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TodoDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-todo',
  imports: [TableComponent, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(TodoDialogComponent);
  }
}
