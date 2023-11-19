import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe],
  selector: 'app-todo',
  template: `
    <div *ngFor="let todo of todoService.todos$ | async">
      {{ todo.title }}
      <button data-test-class="update" (click)="todoService.update(todo)">
        Update
      </button>
      <button data-test-class="delete" (click)="todoService.delete(todo)">
        Delete
      </button>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  public readonly todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }
}
