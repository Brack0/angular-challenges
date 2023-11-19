import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap } from 'rxjs';
import { TodoApiService } from '../api/todo-api.service';
import { Todo } from '../todo.model';
import { TodoService } from './todo.service';

interface TodosState {
  todos: Todo[];
}

@Injectable()
export class TodoComponentStoreService
  extends ComponentStore<TodosState>
  implements TodoService
{
  private readonly apiService = inject(TodoApiService);
  readonly todos$ = this.select((state) => state.todos);

  constructor() {
    super({ todos: [] });
  }

  readonly fetchTodos = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.apiService.getTodos()),
      tapResponse(
        (todos) => this.patchState({ todos }),
        (error: HttpErrorResponse) => console.log(error)
      )
    )
  );

  readonly update = this.effect<Todo>((todo$) =>
    todo$.pipe(
      switchMap((todo) =>
        this.apiService.update(todo).pipe(
          tapResponse(
            (todoUpdated) =>
              this.patchState(({ todos }) => ({
                todos: todos
                  .filter((todo) => todo.id !== todoUpdated.id)
                  .concat(todoUpdated),
              })),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );

  readonly delete = this.effect<Todo>((todo$) =>
    todo$.pipe(
      switchMap((todoToDelete) =>
        this.apiService.delete(todoToDelete).pipe(
          tapResponse(
            () =>
              this.patchState(({ todos }) => ({
                todos: todos.filter((todo) => todo.id !== todoToDelete.id),
              })),
            (error: HttpErrorResponse) => console.log(error)
          )
        )
      )
    )
  );
}
