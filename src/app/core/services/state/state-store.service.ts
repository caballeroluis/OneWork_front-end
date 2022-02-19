import { Injectable } from '@angular/core';
import { Session } from '@sections/session/models';
import { Offer, User } from '@shared/models';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {

  private readonly _smallScreen = new BehaviorSubject<boolean>(window.innerWidth < 480);
  public readonly smallScreen$ = this._smallScreen.asObservable();

  private readonly _session = new BehaviorSubject<Session>(new Session());
  public readonly session$ = this._session.asObservable();

  private readonly _offers = new BehaviorSubject<Offer[]>([]);
  public readonly offers$ = this._offers.asObservable();

  private readonly _users = new BehaviorSubject<User[]>([]);
  public readonly users$ = this._users.asObservable();
  public readonly workers$: Observable<User[]> = this.users$.pipe(
    map(users => users.filter(user => user.role === 'worker'))
  );

  constructor() {
    this.onInit();
  }

  get smallScreen(): boolean {
    return this._smallScreen.getValue();
  }
  set smallScreen(val: boolean) {
    this._smallScreen.next(val);
  }

  get session(): Session {
    return this._session.getValue();
  }
  set session(val: Session) {
    this._session.next(val);
  }
  
  get offers(): Offer[] {
    return this._offers.getValue();
  }
  set offers(val: Offer[]) {
    this._offers.next(val);
  }

  get users(): User[] {
    return this._users.getValue();
  }
  set users(val: User[]) {
    this._users.next(val);
  }

  onInit() {
    this.initializeWindowWidthObserver();
  }

  initializeWindowWidthObserver() {
    fromEvent(window, 'resize').pipe(
      map((event: any) => event.target.innerWidth < 480)
    ).subscribe(async (smallScreen: boolean) => {
      this.smallScreen = smallScreen
    });
  }

  clear() {
    this.session = new Session();
    this.users = [];
    this.offers = [];
  }

}
