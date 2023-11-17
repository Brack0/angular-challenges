import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TodoComponent } from './todo.component';
import { Todo, fakeTodos } from './todo.model';
import { TodoService } from './todo.service';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoService: TodoService;

  const todos$ = new BehaviorSubject<Todo[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
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

    fixture = TestBed.createComponent(TodoComponent);
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
    expect(fixture.debugElement.queryAll(By.css('div')).length).toStrictEqual(
      fakeTodos.length
    );
  });

  describe('on first todo', () => {
    let firstTodo: DebugElement;

    beforeEach(() => {
      firstTodo = fixture.debugElement.query(By.css('div'));
    });

    describe('when clicking on update button', () => {
      beforeEach(() => {
        firstTodo
          .query(By.css('[data-test-class="update"]'))
          .nativeElement.click();
      });

      it('should trigger an update', () => {
        expect(todoService.update).toHaveBeenCalled();
      });
    });

    describe('when clicking on delete button', () => {
      beforeEach(() => {
        firstTodo
          .query(By.css('[data-test-class="delete"]'))
          .nativeElement.click();
      });

      it('should trigger a delete', () => {
        expect(todoService.delete).toHaveBeenCalled();
      });
    });
  });
});
