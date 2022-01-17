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
  
  apiUser() {
    this.userService.apiUser().subscribe(
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

  removeUser(user: User) {
    this.stateStoreService.state.user = this.stateStoreService.state.user.filter(_user => _user._id !== user._id);
  }

}
