import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoApiService } from '../api/todo-api.service';
import { Todo } from '../todo.model';
import { TodoService } from './todo.service';

@Injectable()
export class TodoBehaviorSubjectService implements TodoService {
  private readonly apiService = inject(TodoApiService);
  private readonly todos = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this.todos.asObservable();

  fetchTodos() {
    this.apiService.getTodos().subscribe((todos) => this.todos.next(todos));
  }

  update(todo: Todo) {
    this.apiService.update(todo).subscribe((todoUpdated) =>
      this.todos.next(
        this.todos
          .getValue()
          .filter((todo) => todo.id !== todoUpdated.id)
          .concat(todoUpdated)
      )
    );
  }

  delete(todoToDelete: Todo) {
    this.apiService
      .delete(todoToDelete)
      .subscribe(() =>
        this.todos.next(
          this.todos.getValue().filter((todo) => todo.id !== todoToDelete.id)
        )
      );
  }
}
