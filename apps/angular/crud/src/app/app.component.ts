import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { TodoListComponent } from './todo/todo-list.component';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressSpinnerModule, TodoListComponent],
  selector: 'app-root',
  template: `
    <div style="position: absolute; top: 0; right: 0">
      <mat-spinner *ngIf="loaderService.isLoading$ | async" />
    </div>
    <app-todo-list />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly loaderService = inject(LoaderService);
}
