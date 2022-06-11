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
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  
  showSuccessPermanent(message: string) {
    this.snackBar.open(message, 'OK', {
      panelClass: ['error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
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