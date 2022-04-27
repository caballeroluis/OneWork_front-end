import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { UserService } from '@shared/services';
import { StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateSS: StateStoreService,
    public snackBar: MatSnackBar
  ) { }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: CustomResponses) => {
        this.stateSS.users = response.results as User[];
        this.showSnackBar('User list has been updated');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (response: CustomResponses) => {
        this.showSnackBar('User has been updated');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.users = this.stateSS.users.filter(_user => _user._id !== user._id);

        if (this.stateSS.session.user._id === user._id) {
          this.stateSS.clear();
        }
        this.showSnackBar('User has been deleted');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  showSnackBar(text: string) {
    this.snackBar.open(text, 'OK', {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      // Todo: undo button
    });
  }

}
