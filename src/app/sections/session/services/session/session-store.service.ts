import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { StateStoreService } from 'src/app/services';
import { State } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private stateStoreService: StateStoreService
  ) { }

  register(user: User) {
    this.sessionService.register(user).subscribe(
      (response: User) => {
        this.stateStoreService.update(
          {
            users: [
              ...this.stateStoreService.state.users,
              response
            ]
          } as State
        );

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
        this.stateStoreService.clearState();
        if (response.token?.length > 0) {
          this.stateStoreService.update(
            {
              session: {
                user: response.user as User,
                token: response.token
              }
            } as State
          );
            
          console.log("🚀 ~ file: session-store.service.ts ~ line 56 ~ SessionStoreService ~ login ~ this.stateStoreService", this.stateStoreService)

          
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
        // this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changePassword(user: User) {
    this.sessionService.changePassword(user).subscribe(
      (response: User) => {
        // this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changeEmail(user: User) {
    this.sessionService.changeEmail(user).subscribe(
      (response: User) => {
        // this.session.user = response as User;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
