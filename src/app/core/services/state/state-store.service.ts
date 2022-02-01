import { Injectable } from '@angular/core';
import { State } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {

  private readonly _state = new BehaviorSubject<State>(new State());
  readonly state$ = this._state.asObservable();

  get state(): State {
    return this._state.getValue();
  }

  set state(val: State) {
    this._state.next(val);
  }

  constructor(
  ) { }

  update(newState: State) {
    this.state = {
      ...this.state,
      ...newState
    } as State;
  }

  clear() {
    this.state = new State();
  }

}
