import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserDialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserTableComponent } from './table/table.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { User, UsersService } from '../services/users.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user',
  imports: [MatIconModule, UserTableComponent, MatButtonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit, OnDestroy {
  private api = inject(UsersService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();
  users: User[] = [];

  loadUsers() {
    this.api.getUsers().subscribe({
      error: (err) => {
        console.log('err', err.message);
      },
    });
  }

  openDialog(data?: User) {
    this.dialog.open(UserDialogComponent, {
      data,
    });
  }

  ngOnInit(): void {
    // Subscribe ke users$ untuk mendapatkan data real-time
    this.api.users$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
      this.users = users;
    });

    // Load initial data
    this.loadUsers();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
