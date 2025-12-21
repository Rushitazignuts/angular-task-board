import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface TaskDialogData {
  mode: 'add' | 'edit';
  title?: string;
  description?: string;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent {
  submitted = false;

  taskTitle: string;
  taskDescription: string;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
    this.taskTitle = data.title || '';
    this.taskDescription = data.description || '';
  }

  save(form: NgForm) {
    this.submitted = true;
    form.control.markAllAsTouched();
    if (form.invalid) return;

    this.dialogRef.close({
      title: this.taskTitle,
      description: this.taskDescription,
    });
  }

  close() {
    this.dialogRef.close();
  }
}
