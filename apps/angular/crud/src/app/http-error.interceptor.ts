import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) =>
  next(req).pipe(
    retry(1), // "Don't be down, server. We all think you're doing a great job, and everyone likes you."
    catchError((error: HttpErrorResponse) => {
      console.log('oh no');
      return throwError(() => error);
    })
  );
