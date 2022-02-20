import { Injectable } from '@angular/core';
import { Session } from '@sections/session/models';
import { Offer, User } from '@shared/models';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateStoreService {

  // smallScreen
  private readonly _smallScreen = new BehaviorSubject<boolean>(window.innerWidth < 480);
  public readonly smallScreen$ = this._smallScreen.asObservable();

  // session
  private readonly _session = new BehaviorSubject<Session>(new Session());
  public readonly session$ = this._session.asObservable();

  // offers
  private readonly _offers = new BehaviorSubject<Offer[]>([]);
  public readonly offers$ = this._offers.asObservable();
  public readonly offersVideoConferenceSet$: Observable<Offer[]> = this.offers$.pipe(
    map(offers => offers.filter(offer => offer.status === 'videoconferenceSet'))
  ).pipe(
    map(offers => offers.sort(this.sortBySalary))
  );
  public readonly offersIncompleted$: Observable<Offer[]> = this.offers$.pipe(
    map(offers => offers.filter(offer => offer.status === 'incompleted'))
  ).pipe(
    map(offers => offers.sort(this.sortBySalary))
  );
  public readonly offersOpened$: Observable<Offer[]> = this.offers$.pipe(
    map(offers => offers.filter(offer => offer.status === 'opened')
  )).pipe(
    map(offers => offers.sort(this.sortBySalary))
  );
  public readonly offersAcepted$: Observable<Offer[]> = this.offers$.pipe(
    map(offers => offers.filter(offer => offer.status === 'acepted'))
  ).pipe(
    map(offers => offers.sort(this.sortBySalary))
  );

  // users
  private readonly _users = new BehaviorSubject<User[]>([]);
  public readonly users$ = this._users.asObservable();
  public readonly workers$: Observable<User[]> = this.users$.pipe(
    map(users => users.filter(user => user.role === 'worker'))
  );

  constructor() {
    this.onInit();
  }

  get smallScreen(): boolean {
    console.log("alguien haciendo un get");
    return this._smallScreen.getValue();
  }
  set smallScreen(val: boolean) {
    this._smallScreen.next(val);
  }

  get session(): Session {
    console.log("alguien haciendo un get");
    return this._session.getValue();
  }
  set session(val: Session) {
    this._session.next(val);
  }
  
  get offers(): Offer[] {
    console.log("alguien haciendo un get");
    return this._offers.getValue();
  }
  set offers(val: Offer[]) {
    this._offers.next(val);
  }

  get users(): User[] {
    console.log("alguien haciendo un get");
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

  sortBySalary(a: any, b: any) {
    if (a.salary > b.salary)
      return -1;
    if (a.salary < b.salary)
      return 1;
    return 0;
  }

  clear() {
    this.session = new Session();
    this.users = [];
    this.offers = [];
  }

}
