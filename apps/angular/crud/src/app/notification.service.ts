import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly matSnackBar = inject(MatSnackBar);

  showError(errorMessage: string): void {
    this.matSnackBar.open(errorMessage, 'Dismiss', { panelClass: ['error'] });
  }
}
