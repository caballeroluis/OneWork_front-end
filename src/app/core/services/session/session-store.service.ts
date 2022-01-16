import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionApiResponse, State, User } from '@core/models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SessionService } from '..';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  private readonly _session = new BehaviorSubject<Session>(null!);
  readonly session$ = this._session.asObservable();

  private readonly _state = new BehaviorSubject<State>(null!);
  readonly state$ = this._state.asObservable();
  
  public stateDetailSubscription!: Subscription;
  public stateDetail!: State;

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  get session(): Session {
    return this._session.getValue();
  }

  set session(val: Session) {
    this._session.next(val);
  }

  get state(): State {
    return this._state.getValue();
  }

  set state(val: State) {
    this._state.next(val);
  }

  register(session: Session) {
    this.sessionService.register(session).subscribe(
      (response: SessionApiResponse) => {
        if (response.ok) {
          this.addSessionAttr({
            user: response.user,
          } as Session);
          
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

  login(session: Session) {
    this.sessionService.login(session).subscribe(
      (response: SessionApiResponse) => {
        if (!response.ok) {
          throw new Error(response.err.message);
        } else if (response.token?.length > 0) {
          this.addSessionAttr({
            user: response.user,
            token: response.token
          } as Session);
          
          this.addStateAttr({
            session: {
              user: response.user as User
            }
          } as State);
          
          this.router.navigate(['session', 'profile']);

          this.stateDetailSubscription = this.state$.subscribe(state => {
            this.stateDetail = state;
          });
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  update(session: Session) {
    this.sessionService.update(session).subscribe(
      (response: SessionApiResponse) => {
        if (!response.ok) {
          throw new Error(response.err.message);
        } else if (response.token?.length > 0) {
          this.addSessionAttr({
            user: response.user
          } as Session);
          
          this.router.navigate(['session', 'profile']);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  addSessionAttr(val: Session) {
    this.session = <Session>{
      ...this.session,
      ...val
    }
  }

  addStateAttr(val: State) {
    this.state = {
      ...this.state,
      ...val
    } as State
  }

}
