import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { SharedService } from '../../services/shared.service';
import { DatePipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'todo-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoDialogComponent {
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private shared: SharedService,
    private dialogRef: MatDialogRef<TodoDialogComponent>
  ) {
    if (this.data) {
      this.todoForm.patchValue({
        id: Number(this.data.id),
        title: this.data.title,
        deadline: this.data.deadline,
      });
    }
  }

  todoForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.todoForm.valid) {
      const { id, title, deadline } = this.todoForm.value;
      if (!id) {
        this.shared.addTodo({
          id: Number(new Date().getTime()),
          deadline: new Date(deadline!),
          title: String(title),
        });
      } else {
        this.shared.updateTodo({
          id,
          deadline: new Date(deadline!),
          title: String(title),
        });
      }
      this.dialogRef.close();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }
}
