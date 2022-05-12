import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: ['error'],
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  
  showError(message: string) {
    this.snackBar.open(message, 'X', {
      panelClass: ['error'],
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}