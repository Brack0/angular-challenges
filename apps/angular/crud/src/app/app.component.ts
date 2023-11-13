import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoService } from './todo/todo.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todoService.todos$ | async">
      {{ todo.title }}
      <button (click)="todoService.update(todo)">Update</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(public readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.fetchTodos();
  }
}
