import { TestBed } from '@angular/core/testing';
import { EMPTY, filter, of } from 'rxjs';
import { TodoApiService } from '../api/todo-api.service';
import { fakeTodos } from '../todo.model';
import { TodoBehaviorSubjectService } from './todo-behavior-subject.service';
import { TodoComponentStoreService } from './todo-component-store.service';
import { TodoService } from './todo.service';

describe.each([
  ['TodoBehaviorSubjectService', TodoBehaviorSubjectService],
  ['TodoComponentStoreService', TodoComponentStoreService],
])(
  'TodoService with implementation %s',
  (_implentationName, TodoServiceImpl) => {
    let service: TodoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: TodoService, useClass: TodoServiceImpl },
          {
            provide: TodoApiService,
            useValue: {
              getTodos: jest.fn(() => of(fakeTodos)),
              update: jest.fn((todo) => of(todo)),
              delete: jest.fn(() => EMPTY),
            },
          },
        ],
      });

      service = TestBed.inject(TodoService);
    });

    it('should update todos$ after fetch', () => {
      expect.assertions(1);
      service.todos$
        .pipe(filter((value) => value.length > 0))
        .subscribe((value) => expect(value).toStrictEqual(fakeTodos));
      service.fetchTodos();
    });

    describe('when we have todos', () => {
      beforeEach(() => {
        service.fetchTodos();
      });

      describe('and we update a todo', () => {
        beforeEach(() => {
          service.update({ ...fakeTodos[0], title: 'updated' });
        });

        it('should update todos observable', () => {
          expect.assertions(1);
          service.todos$.subscribe((todos) => {
            expect(
              todos.some(
                (todo) =>
                  todo.title === 'updated' && todo.id === fakeTodos[0].id
              )
            ).toBeTruthy();
          });
        });
      });

      describe('and we delete a todo', () => {
        beforeEach(() => {
          service.delete(fakeTodos[0]);
        });

        it('should remove todo from todos observables', () => {
          expect.assertions(1);
          service.todos$.subscribe((todos) => {
            expect(todos.length).toStrictEqual(fakeTodos.length - 1);
            expect(todos.every((todo) => todo.id !== fakeTodos[0].id));
          });
        });
      });
    });
  }
);
