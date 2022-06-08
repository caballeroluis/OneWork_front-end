import { Injectable } from '@angular/core';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';
import { OfferStoreService, UserStoreService } from '@shared/services';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(
    private location: Location,
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

        this.notificationService.showSuccess('User has been registered');
        this.login(user);
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
          
          this.location.back();
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
          this.notificationService.showError('The expired session has been renewed. Please try againn');
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
        }
        this.notificationService.showSuccess('Session has been closed');
        this.userSS.getUsers();
        this.offerSS.getOffers();
      },
      (error: any) => {
      }
    );
  }

}
