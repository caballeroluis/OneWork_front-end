import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '@core/models';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private stateStoreService: StateStoreService,
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
        this.stateStoreService.update(
          {
            session: {
              user: response as User
            }
            // TODO: cuando se actualize el usuario de sesión, que se actualize también el session.user y el users de state
          } as State
        );
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changePassword(user: User) {
    this.sessionService.changePassword(user).subscribe(
      (response: User) => {
        
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
