import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';

let pendingRequestCount = 0;

export const httpLoaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);

  pendingRequestCount++;
  loaderService.isLoading$.next(true);

  return next(req).pipe(
    finalize(() => {
      pendingRequestCount--;
      if (pendingRequestCount === 0) {
        loaderService.isLoading$.next(false);
      }
    })
  );
};
