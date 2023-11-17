import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  private readonly notificationService = inject(NotificationService);

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      console.log(`HTTP status : ${error.status}`);
      this.notificationService.showError(
        'An error occured while fetching data, please try again later.'
      );
      return;
    }

    console.log('JS error');
    this.notificationService.showError(error.message);
  }
}
