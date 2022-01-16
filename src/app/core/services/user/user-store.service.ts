import { Injectable } from '@angular/core';
import { State, User, UserApiResponse } from '@core/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserService } from '..';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _user = new BehaviorSubject<User[]>([]);
  public readonly user$ = this._user.asObservable();

  private readonly _state = new BehaviorSubject<State>(null!);
  readonly state$ = this._state.asObservable();
  
  public stateDetailSubscription!: Subscription;
  public stateDetail!: State;

  constructor(
    private userService: UserService
  ) { }
  
  get user(): User[] {
    return this._user.getValue();
  }

  set user(val: User[]) {
    this._user.next(val);
  }

  get state(): State {
    return this._state.getValue();
  }

  set state(val: State) {
    this._state.next(val);
  }

  apiUser() {
    this.userService.apiUser().subscribe(
      (response: UserApiResponse) => {
        if (response.ok) {
          this.user = response.user as User[];
          
          this.addStateAttr({
              user: response.user as User[]
          } as State);

          this.stateDetailSubscription = this.state$.subscribe(state => {
            this.stateDetail = state;
          });
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
    this.stateDetail.user = this.stateDetail.user.filter(_user => _user._id !== user._id);
    this.user = this.user.filter(_user => _user._id !== user._id);
    this.state.user = this.state.user.filter(_user => _user._id !== user._id);
  }

  addStateAttr(val: State) {
    this.state = {
      ...this.state,
      ...val
    } as State
  }

}
