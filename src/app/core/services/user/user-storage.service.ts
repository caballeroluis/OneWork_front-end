import { Injectable } from '@angular/core';
import { User } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '..';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  private readonly _user = new BehaviorSubject<User[]>([]);
  public readonly user$ = this._user.asObservable();

  constructor(
    private _userService: UserService
  ) { }
  
  get user(): User[] {
    return this._user.getValue();
  }

  set user(val: User[]) {
    this._user.next(val);
  }

  apiUser() {
    this._userService.apiUser().subscribe(
      (response: User) => {
        console.log(response);
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
