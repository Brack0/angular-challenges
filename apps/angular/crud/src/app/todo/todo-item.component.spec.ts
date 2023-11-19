import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoService } from './services/todo.service';
import { TodoItemComponent } from './todo-item.component';
import { fakeTodos } from './todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = fakeTodos[0];

    todoService = TestBed.inject(TodoService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('when clicking on update button', () => {
    beforeEach(() => {
      fixture.debugElement
        .query(By.css('[data-test-class="update"]'))
        .nativeElement.click();
    });

    it('should trigger an update', () => {
      expect(todoService.update).toHaveBeenCalled();
    });
  });

  describe('when clicking on delete button', () => {
    beforeEach(() => {
      fixture.debugElement
        .query(By.css('[data-test-class="delete"]'))
        .nativeElement.click();
    });

    it('should trigger a delete', () => {
      expect(todoService.delete).toHaveBeenCalled();
    });
  });
});
