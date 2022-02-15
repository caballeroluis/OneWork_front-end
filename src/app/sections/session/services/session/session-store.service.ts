import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { StateStoreService } from '@core/services';

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
        if (this.stateStoreService.state.users.length > 0) {
          this.stateStoreService.state.users = [
            ...this.stateStoreService.state.users,
            response as User
          ];
        }
        
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
        this.stateStoreService.clear();
        if (response.token?.length > 0) {
          this.stateStoreService.state.session = response as Session;
          
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
        this.stateStoreService.state.session.user = response as User;

        this.stateStoreService.state.users[
          this.stateStoreService.state.users.findIndex(_user => _user._id == user._id)
        ] = user;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changePassword(user: User) {
    this.sessionService.changePassword(user).subscribe(
      (response: User) => {
        this.stateStoreService.state.session.user = response as User;
        
        this.stateStoreService.state.users[
          this.stateStoreService.state.users.findIndex(_user => _user._id == user._id)
        ] = user;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  changeEmail(user: User) {
    this.sessionService.changeEmail(user).subscribe(
      (response: User) => {
        this.stateStoreService.state.session.user = response as User;

        this.stateStoreService.state.users[
          this.stateStoreService.state.users.findIndex(_user => _user._id == user._id)
        ] = user;
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
