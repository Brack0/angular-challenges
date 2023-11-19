import { Component, Input, inject } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo } from './todo.model';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  template: `
    {{ todo.title }}
    <button data-test-class="update" (click)="todoService.update(todo)">
      Update
    </button>
    <button data-test-class="delete" (click)="todoService.delete(todo)">
      Delete
    </button>
  `,
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  public readonly todoService = inject(TodoService);
}
