import { Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  
  constructor(public snackBar: MatSnackBar) { }
  
  showSuccess(message: string) {
    this.snackBar.open(message, '', {
      panelClass: ['error'],
      duration: 4 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
  showError(message: string) {
    this.snackBar.open(message, 'OK', {
      panelClass: ['error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}