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
import { Todo } from '../table/table.component';
import { DatePipe } from '@angular/common';

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
  constructor(
    private shared: SharedService,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<TodoDialogComponent>
  ) {}

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') ?? '';
  }

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    deadline: new FormControl('', Validators.required),
  });

  handleSubmit() {
    if (this.todoForm.valid) {
      this.shared.addTodo({
        id: Number(new Date().getTime()),
        deadline: new Date(this.todoForm.value.deadline!),
        title: String(this.todoForm.value.title),
      });
      this.dialogRef.close();
    } else {
      this.todoForm.markAllAsTouched();
    }
  }
}
