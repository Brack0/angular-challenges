import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TodoService } from './services/todo.service';
import { TodoItemComponent } from './todo-item.component';
import { TodoListComponent } from './todo-list.component';
import { Todo, fakeTodos } from './todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  const todos$ = new BehaviorSubject<Todo[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            todos$,
            fetchTodos: jest.fn(() => {
              todos$.next(fakeTodos);
            }),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should fetch todos on init', () => {
    expect(todoService.fetchTodos).toHaveBeenCalled();
  });

  it('should display all todos', () => {
    expect(
      fixture.debugElement.queryAll(By.directive(TodoItemComponent)).length
    ).toStrictEqual(fakeTodos.length);
  });
});
