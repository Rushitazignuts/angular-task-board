import { Component, Input } from '@angular/core';
import { Task } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { NgIf, NgForOf } from '@angular/common';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, NgIf, NgForOf, CdkDrag],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Input() editTask!: (task: Task) => void;
  @Input() confirmDelete!: (id: number) => void;

  trackById(index: number, task: Task) {
    return task.id;
  }
}
