import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  private readonly _session = new BehaviorSubject<Session>(new Session());
  readonly session$ = this._session.asObservable();

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  get session(): Session {
    return this._session.getValue();
  }

  set session(val: Session) {
    this._session.next(val);
  }

  register(user: User) {
    this.sessionService.register(user).subscribe(
      (response: User) => {
        this.session.user = response as User
        
        // this.router.navigate(['session', 'profile']);
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  login(user: User) {
    this.sessionService.login(user).subscribe(
      (response: Session) => {
        this.clear();
        if (response.token?.length > 0) {
          this.session = {
            ...this.session,
            user: response.user as User,
            token: response.token
          } as Session
          
          // this.router.navigate(['session', 'profile']);
        }
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  updateUserProfile(user: User) {
    this.sessionService.updateUserProfile(user).subscribe(
      (response: User) => {
        this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changePassword(user: User) {
    this.sessionService.changePassword(user).subscribe(
      (response: User) => {
        this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changeEmail(user: User) {
    this.sessionService.changeEmail(user).subscribe(
      (response: User) => {
        this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  clear() {
    this.session = new Session();
  }

}
