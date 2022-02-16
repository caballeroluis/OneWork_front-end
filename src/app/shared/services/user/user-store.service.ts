import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { UserService } from '@shared/services';
import { StateStoreService } from '@core/services';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateSS: StateStoreService
  ) { }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.stateSS.users = response as User[];
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (response: User) => {
        
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (response: User) => {
        if (environment.mock) { // TODO: esperar cambio de ids en back-end
          this.stateSS.users = this.stateSS.users.filter(_user => _user.id !== user.id);

          if (this.stateSS.session.user.id === response.id) {
            this.stateSS.clear();
          }
        } else {
          this.stateSS.users = this.stateSS.users.filter(_user => _user._id !== user._id);

          if (this.stateSS.session.user._id === response._id) {
            this.stateSS.clear();
          }
        }
        
       
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
