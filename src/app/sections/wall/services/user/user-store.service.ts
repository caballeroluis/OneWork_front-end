import { Injectable } from '@angular/core';
import { State, User, UserApiResponse } from '@core/models';
import { StateStoreService } from '@core/services';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private userService: UserService,
    private stateStoreService: StateStoreService,
  ) { }
  
  getUser() {
    this.userService.getUser().subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.stateStoreService.update({
            user: response.user as User[]
          } as State);
          
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
    this.stateStoreService.state.user = this.stateStoreService.state.user.filter(_user => _user._id !== user._id);

    this.userService.deleteUser(user).subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          console.log(response);
        } else {
          this.stateStoreService.state.user = [...this.stateStoreService.state.user, user];
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        this.stateStoreService.state.user = [...this.stateStoreService.state.user, user];
        throw new Error(error);
      }
    );
  }

}
