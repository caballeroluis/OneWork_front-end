import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionApiResponse } from '@core/models';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '..';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly _session = new BehaviorSubject<Session>(null!);
  readonly session$ = this._session.asObservable();

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

  login(session: Session) {
    this.sessionService.login(session.email, session.password).subscribe(
      (response: SessionApiResponse) => {
        if (!response.ok) {
          throw new Error(response.err.message);
        } else if (response.token?.length > 0) {
          this.addSessionAttr(<Session>{
            email: session.email,
            token: response.token
          });
          
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

}
