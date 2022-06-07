import { Component } from '@angular/core';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    private userSS: UserStoreService,
    public stateSS: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (
      // this.stateSS.session.token.length > 0 && // TODO: descomentar esto cuando back pida session aquí
      (!this.stateSS.users || this.stateSS.users.length === 0)
    ) {
      this.userSS.getUsers();
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

  getUsers() {
    this.userSS.getUsers();
  }

  deleteUser(user: User) {
    this.userSS.deleteUser(user);
  }

}
