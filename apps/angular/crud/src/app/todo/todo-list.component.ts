import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoItemComponent } from './todo-item.component';

@Component({
  standalone: true,
  imports: [NgFor, AsyncPipe, TodoItemComponent],
  selector: 'app-todo-list',
  template: `
    <div *ngFor="let todo of todoService.todos$ | async">
      <app-todo-item [todo]="todo" />
    </div>
  `,
})
export class TodoListComponent implements OnInit {
  public readonly todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }
}
