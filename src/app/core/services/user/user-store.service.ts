import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserApiResponse } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '..';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _user = new BehaviorSubject<User[]>([]);
  public readonly user$ = this._user.asObservable();

  constructor(
    private router: Router,
    private userService: UserService
  ) { }
  
  get user(): User[] {
    return this._user.getValue();
  }

  set user(val: User[]) {
    this._user.next(val);
  }

  apiUser() {
    this.userService.apiUser().subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.user = <User[]>response.user;
        } else {
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  register(user: User) {
    this.userService.register(user).subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.user = <User[]>response.user;
          this.router.navigate(['session', 'login']);
        } else {
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  update(user: User) {
    this.userService.register(user).subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.user = <User[]>response.user;
          this.router.navigate(['session', 'login']);
        } else {
          throw new Error(response.err.message);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
