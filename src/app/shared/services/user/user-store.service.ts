import { Injectable } from '@angular/core';
import { SessionStoreService } from '@sections/session/services';
import { User } from '@shared/models';
import { UserService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _users = new BehaviorSubject<User[]>([]);
  readonly users$ = this._users.asObservable();

  constructor(
    private userService: UserService,
    private sessionStoreService: SessionStoreService
  ) { }

  get users(): User[] {
    return this._users.getValue();
  }

  set users(val: User[]) {
    this._users.next(val);
  }
  
  getUsers() {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response as User[];
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
        this.users = this.users.filter(_user => _user._id !== user._id);

        // if (this.sessionStoreService.user._id === response._id) { // TODO: que sea de la response no del user
        if (this.sessionStoreService.session.user._id === user._id) {
          this.sessionStoreService.clear();
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  clear() {
    this.users = [];
  }

}
