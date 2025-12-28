import { Injectable, signal, computed } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string; 
  status: 'todo' | 'in-progress' | 'done';
}


@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly storageKey = 'tasks';
  tasks = signal<Task[]>(this.load());

  private load(): Task[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
  }

  addTask(title: string, description?: string) {
    const newTask: Task = { 
      id: Date.now(), 
      title, 
      description,
      status: 'todo' 
    };
    this.tasks.update(list => [...list, newTask]);
    this.save();
  }

updateTask(id: number, title: string, description?: string) {
  this.tasks.update(list =>
    list.map(t => t.id === id ? { ...t, title, description } : t)
  );
  this.save();
}

  moveTask(id: number, newStatus: Task['status']) {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
    this.save();
  }

  deleteTask(id: number) {
    this.tasks.update(list => list.filter(t => t.id !== id));
    this.save();
  }

  all = computed(() => this.tasks());
}
