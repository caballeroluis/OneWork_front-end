import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';
import { OfferStoreService, UserStoreService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userSS: UserStoreService,
    private offerSS: OfferStoreService,
    private stateSS: StateStoreService,
    private notificationService: NotificationService
  ) { }

  register(user: User) {
    this.sessionService.register(user).subscribe(
      (response: CustomResponses) => {
        this.userSS.getUsers(); // this.stateSS.users.push(response.result as User); // TODO: pensar otra solución de si un usuario se registra antes de cargar página /users

        // this.router.navigate(['session', 'profile']);
        this.notificationService.showSuccess('User has been registered');
      },
      (error: any) => {
      }
    );
  }

  login(user: User) {
    this.stateSS.clear();
    this.sessionService.login(user).subscribe(
      (response: Session) => {
        if (response.token?.length > 0) {
          this.stateSS.session = response as Session;
          
          this.router.navigate(['board']);
        }
        this.notificationService.showSuccess('User has been loged');
      },
      (error: any) => {
      }
    );
  }

  refreshToken() {
    this.sessionService.refreshToken(this.stateSS.session).subscribe(
      (response: Session) => {
        if (response.token?.length > 0) {
          this.stateSS.session = {
            ...this.stateSS.session,
            refreshToken: response.refreshToken? response.refreshToken : this.stateSS.session.refreshToken, // TODO: acomodar esto tras ver qué pasa con la API y el refreshtoken
            token: response.token
          };
        }
      },
      (error: any) => {
      }
    );
  }

  logout() { // TODO: pendiente testear cuando funcione en la API
    this.sessionService.logout().subscribe(
      (response: Session) => {
        this.stateSS.clear();
        if (response.token?.length > 0) {
          this.stateSS.session = response as Session;
          
          // this.router.navigate(['session/login']);
        }
        this.notificationService.showSuccess('Session has been closed');
      },
      (error: any) => {
        this.stateSS.clear(); // TODO: pendiente quitar esta línea cuando funcione en la API
      }
    );
  }

  updateUserProfile(user: User) {
    this.sessionService.updateUserProfile(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.session.user = response.result as User;

        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id === user._id)
        ] = user;
        this.notificationService.showSuccess('Profile has been updated');
        this.offerSS.getOffers();
        this.userSS.getUsers(); // TODO: pensar otra solución de si un usuario se registra antes de cargar página /users
      },
      (error: any) => {
      }
    );
  }
  
  changePassword(user: User) {
    this.sessionService.changePassword(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.session.user = response.result as User;
        
        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id == user._id)
        ] = user;
        this.notificationService.showSuccess('Password has been updated');
      },
      (error: any) => {
      }
    );
  }
  
  changeEmail(user: User) {
    this.sessionService.changeEmail(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.session.user = response.result as User;

        this.stateSS.users[
          this.stateSS.users.findIndex(_user => _user._id == user._id)
        ] = user;
        this.notificationService.showSuccess('Username has been updated');
        this.userSS.getUsers(); // TODO: pensar otra solución de si un usuario se registra antes de cargar página /users
      },
      (error: any) => {
      }
    );
  }
}
