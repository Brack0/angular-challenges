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

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ErrorHandler, useClass: CustomErrorHandler },
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, httpLoaderInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
  ],
};
