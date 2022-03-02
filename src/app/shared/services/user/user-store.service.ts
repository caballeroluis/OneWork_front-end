import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { UserService } from '@shared/services';
import { StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

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
      (response: CustomResponses) => {
        this.stateSS.users = response.results as User[];
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (response: CustomResponses) => {
        
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
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
