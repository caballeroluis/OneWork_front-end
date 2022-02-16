import { Injectable } from '@angular/core';
import { State } from '@core/models';
import { User } from '@shared/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {

  private readonly _state = new BehaviorSubject<State>(new State());
  public readonly state$ = this._state.asObservable();

  private readonly _users = new BehaviorSubject<User[]>(this.state.users);
  public readonly users$ = this._users.asObservable();
  public readonly workers$: Observable<User[]> = this.users$.pipe(
    map(users => users.filter(user => user.role === 'worker'))
  );

  constructor() { }

  get state(): State {
    return this._state.getValue();
  }

  set state(val: State) {
    this._state.next(val);
  }

  get users(): User[] {
    return this._users.getValue();
  }

  set users(val: User[]) {
    this._users.next(val);
  }

  clear() {
    this.state = new State();
    this.users = [];
  }

}
