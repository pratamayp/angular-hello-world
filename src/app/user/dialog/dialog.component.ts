import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'user-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class UserDialogComponent {
  private api = inject(UsersService);
  private _snackBar = inject(MatSnackBar);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(private dialogRef: MatDialogRef<UserDialogComponent>) {
    if (this.data) {
      this.userForm.patchValue({
        id: this.data.id,
        email: this.data.email,
        name: this.data.name,
      });
    }
  }

  userForm = new FormGroup({
    id: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.userForm.valid) {
      const { id, email, name } = this.userForm.value;
      if (!id) {
        this.api
          .addUser({
            email: String(email),
            name: String(name),
          })
          .subscribe({
            complete: () => {
              this.dialogRef.close();
              this.api.refreshUsers();
            },
            next: () => {
              this._snackBar.open('User ditambahkan', 'Close', {
                duration: 3000,
              });
            },
            error: (err) => {
              this._snackBar.open(err.message, 'Close', { duration: 3000 });
            },
          });
      } else {
        this.api
          .editUser(id, {
            email: String(email),
            name: String(name),
          })
          .subscribe({
            complete: () => {
              this.dialogRef.close();
              this.api.refreshUsers();
            },
            next: () => {
              this._snackBar.open('User diubah', 'Close', {
                duration: 3000,
              });
            },
            error: (err) => {
              this._snackBar.open(err.message, 'Close', { duration: 3000 });
            },
          });
      }
    }
  }
}
