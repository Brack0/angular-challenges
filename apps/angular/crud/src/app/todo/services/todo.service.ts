import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';

export interface TodoService {
  readonly todos$: Observable<Todo[]>;

  fetchTodos(): void;
  update(todo: Todo): void;
  delete(todoToDelete: Todo): void;
}

export const TodoService = new InjectionToken<TodoService>('TodoService');
