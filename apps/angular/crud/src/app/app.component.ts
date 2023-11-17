import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { TodoService } from './todo/todo.service';

@Component({
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, MatProgressSpinnerModule],
  selector: 'app-root',
  template: `
    <div style="position: absolute; top: 0; right: 0">
      <mat-spinner *ngIf="loaderService.isLoading$ | async"></mat-spinner>
    </div>
    <div *ngFor="let todo of todoService.todos$ | async">
      {{ todo.title }}
      <button (click)="todoService.update(todo)">Update</button>
      <button (click)="todoService.delete(todo)">Delete</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public readonly todoService = inject(TodoService);
  public readonly loaderService = inject(LoaderService);

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }
}
