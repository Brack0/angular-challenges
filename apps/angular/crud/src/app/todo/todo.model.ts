import {
  incrementalNumber,
  randBoolean,
  randNumber,
  randText,
} from '@ngneat/falso';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const factoryTodo = incrementalNumber();

export const randTodo = () => ({
  userId: randNumber(),
  id: factoryTodo(),
  title: randText(),
  completed: randBoolean(),
});

export const fakeTodos = [randTodo(), randTodo(), randTodo(), randTodo()];
