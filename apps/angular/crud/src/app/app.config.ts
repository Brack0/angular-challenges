import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
} from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CustomErrorHandler } from './error.handler';
import { httpErrorInterceptor } from './http-error.interceptor';
import { httpLoaderInterceptor } from './http-loader.interceptor';
import { TodoComponentStoreService } from './todo/services/todo-component-store.service';
import { TodoService } from './todo/services/todo.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    { provide: TodoService, useClass: TodoComponentStoreService },
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, httpLoaderInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
  ],
};
