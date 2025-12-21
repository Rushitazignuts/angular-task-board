import { Component, Input } from '@angular/core';
import { Task } from '../../services/task.service';
import { CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [CdkDropList, CdkDrag, TaskItemComponent],
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss'],
})
export class TaskColumnComponent {
  @Input() title!: string;
  @Input() tasks!: Task[];
  @Input() connectedTo!: string[];
  @Input() onDrop!: (event: any) => void;
  @Input() deleteTask!: (id: number) => void;
}
