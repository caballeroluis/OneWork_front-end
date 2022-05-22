import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/models';
import { SessionService } from '@sections/session/services';
import { Session } from '@sections/session/models';
import { StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfferStoreService } from '@shared/services';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private offerSS: OfferStoreService,
    private stateSS: StateStoreService,
    public snackBar: MatSnackBar
  ) { }

  register(user: User) {
    this.sessionService.register(user).subscribe(
      (response: CustomResponses) => {
        this.stateSS.users = [
          ...this.stateSS.users,
          response.result as User
        ];
        
        // this.router.navigate(['session', 'profile']);
        this.showSnackBar('User has been registered');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  login(user: User) {
    this.sessionService.login(user).subscribe(
      (response: Session) => {
        this.stateSS.clear();
        if (response.token?.length > 0) {
          this.stateSS.session = response as Session;
          
          this.router.navigate(['board']);
        }
        this.showSnackBar('User has been loged');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  logout() { // TODO: pendiente testear cuando funcione en la API
    this.sessionService.logout().subscribe(
      (response: Session) => {
        this.stateSS.clear();
        if (response.token?.length > 0) {
          this.stateSS.session = response as Session;
          
          this.router.navigate(['session/login']);
        }
        this.showSnackBar('Session has been closed');
      },
      (error: any) => {
        this.stateSS.clear(); // TODO: pendiente quitar esta línea cuando funcione en la API
        throw new Error(error);
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
        this.showSnackBar('Profile has been updated');
        this.offerSS.getOffers();
      },
      (error: any) => {
        throw new Error(error);
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
        this.showSnackBar('Password has been updated');
      },
      (error: any) => {
        throw new Error(error);
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
        this.showSnackBar('Email has been updated');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }
  
  showSnackBar(text: string) {
    this.snackBar.open(text, 'OK', {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      // Todo: undo button
    });
  }

}
