import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { UserService } from '@shared/services';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateSS: StateStoreService,
    private notificationService: NotificationService
  ) { }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: CustomResponses) => {
        this.stateSS.users = response.results as User[];
        // this.notificationService.showSuccess('User list has been updated');
      },
      (error: any) => {
      }
    );
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('User has been updated');
      },
      (error: any) => {
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
        this.notificationService.showSuccess('User has been deleted');
      },
      (error: any) => {
        this.getUsers(); // TODO: hacer sincro del state y borrar esta línea
      }
    );
  }
}
