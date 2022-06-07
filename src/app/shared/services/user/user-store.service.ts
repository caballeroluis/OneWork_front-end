import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { UserService, OfferStoreService } from '@shared/services';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateSS: StateStoreService,
    private offerSS: OfferStoreService,
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

  verifiedUser(user: User) {
    this.userService.verifiedUser(user).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('User has been verified');
        this.getUsers(); // TODO: hacer sincro del state y borrar esta línea
      },
      (error: any) => {
        this.getUsers(); // TODO: hacer sincro del state y borrar esta línea
      }
    );
  }

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      (response: CustomResponses) => {
        if (this.stateSS.session.user.role !== 'admin') {
          this.stateSS.session.user = response.result as User;
        }

        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id === user._id)
        ] = user;
        this.notificationService.showSuccess('Profile has been updated');
        this.offerSS.getOffers();
        this.getUsers(); // TODO: pensar otra solución de si un usuario se registra antes de cargar página /users
      },
      (error: any) => {
      }
    );
  }
  
  changePassword(user: User) {
    this.userService.changePassword(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.session.user = response.result as User;
        
        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id == user._id)
        ] = user;
        this.notificationService.showSuccess('Password has been updated');
      },
      (error: any) => {
      }
    );
  }
  
  changeEmail(user: User) {
    this.userService.changeEmail(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.session.user = response.result as User;

        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id == user._id)
        ] = user;
        this.notificationService.showSuccess('Username has been updated');
        this.offerSS.getOffers();
        this.getUsers(); // TODO: pensar otra solución de si un usuario se registra antes de cargar página /users
      },
      (error: any) => {
      }
    );
  }

}
