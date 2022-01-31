import { Injectable } from '@angular/core';
import { State } from '@core/models';
import { User, UserApiResponse } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateStoreService: StateStoreService,
  ) { }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.stateStoreService.update(
            {
              users: response.users as User[]
            } as State
          );
          
        } else {
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  deleteUser(user: User) {
    this.stateStoreService.state.users = this.stateStoreService.state.users.filter(_user => _user._id !== user._id);

    this.userService.deleteUser(user).subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
        } else {
          this.stateStoreService.state.users = [...this.stateStoreService.state.users, user];
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        this.stateStoreService.state.users = [...this.stateStoreService.state.users, user];
        throw new Error(error);
      }
    );
  }

}
