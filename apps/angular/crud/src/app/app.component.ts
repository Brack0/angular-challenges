import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './loader.service';
import { TodoComponent } from './todo/todo.component';

@Component({
  standalone: true,
  imports: [NgIf, AsyncPipe, MatProgressSpinnerModule, TodoComponent],
  selector: 'app-root',
  template: `
    <div style="position: absolute; top: 0; right: 0">
      <mat-spinner *ngIf="loaderService.isLoading$ | async"></mat-spinner>
    </div>
    <app-todo></app-todo>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly loaderService = inject(LoaderService);
}
