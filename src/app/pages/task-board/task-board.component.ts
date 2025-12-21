import { Component } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    TaskListComponent,
  ],
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent {
  searchTerm = '';

  constructor(public taskService: TaskService, private dialog: MatDialog) {}

  get todoTasks() {
    return this.taskService.all().filter((t) => t.status === 'todo' && this.matchSearch(t));
  }
  get inProgressTasks() {
    return this.taskService.all().filter((t) => t.status === 'in-progress' && this.matchSearch(t));
  }
  get doneTasks() {
    return this.taskService.all().filter((t) => t.status === 'done' && this.matchSearch(t));
  }

  matchSearch(t: Task) {
    return t.title.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  drop(event: CdkDragDrop<Task[]>) {
    const task: Task = event.item.data;

    if (event.previousContainer === event.container) {
      // just reorder inside the same list
      event.previousContainer.data.splice(event.previousIndex, 1);
      event.previousContainer.data.splice(event.currentIndex, 0, task);
    } else {
      // move task in service
      this.taskService.moveTask(task.id, this.getStatusFromListId(event.container.id));

      // visually move task
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  getStatusFromListId(listId: string): Task['status'] {
    switch (listId) {
      case 'todoList':
        return 'todo';
      case 'inProgressList':
        return 'in-progress';
      case 'doneList':
        return 'done';
      default:
        return 'todo';
    }
  }

  openDialog(mode: 'add' | 'edit', task?: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '450px',
      data: { mode, title: task?.title, description: task?.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (mode === 'add') this.taskService.addTask(result.title, result.description);
        if (mode === 'edit' && task)
          this.taskService.updateTask(task.id, result.title, result.description);
      }
    });
  }

  editTask = (task: Task) => this.openDialog('edit', task);

  deleteTask = (id: number) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: { message: 'Are you sure you want to delete this task?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.taskService.deleteTask(id);
    });
  };
}
