import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { User, UsersService } from '../../services/users.service';

@Component({
  selector: 'user-table',
  imports: [MatTableModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class UserTableComponent {
  private api = inject(UsersService);
  @Input() data: User[] = [];
  @Output() edit = new EventEmitter<User>();

  displayedColumns: string[] = ['no', 'name', 'email', 'action'];

  handleEdit(data: User) {
    this.edit.emit(data);
  }
  handleDelete(id: string) {
    this.api.deleteUser(id).subscribe({
      next: () => {
        console.log('User berhasil dihapus');
        this.api.refreshUsers();
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
