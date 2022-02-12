import { Injectable } from '@angular/core';
import { State } from '@core/models';
import { User } from '@shared/models';
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
      (response: User[]) => {
        this.stateStoreService.update(
          {
            users: response as User[]
          } as State
        );
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  editUser(user: User) {
    this.userService.editUser(user).subscribe(
      (response: User) => {
        // TODO: actualizar este user en users
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      (response: User) => {
        this.stateStoreService.state.users = this.stateStoreService.state.users.filter(_user => _user._id !== user._id);

        // if (this.stateStoreService.state.session.user._id === response._id) { // TODO: que sea de la response no del user
        if (this.stateStoreService.state.session.user._id === user._id) {
          this.stateStoreService.clearSession();
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
