import { Component } from '@angular/core';
import { SessionStoreService } from '@sections/session/services';
import { User } from '@shared/models';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    public userStoreService: UserStoreService,
    public sessionStoreService: SessionStoreService
  ) { }

  ngAfterViewInit() {
    if (
      // this.sessionStoreService.token.length > 0 && // TODO: descomentar esto cuando back pida session aquí
      (!this.userStoreService.users || this.userStoreService.users.length === 0)
    ) {
      this.userStoreService.getUsers();
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

  getUsers() {
    this.userStoreService.getUsers();
  }

  editUser(user: User) { // TODO: hacer
    this.userStoreService.editUser(user);
  }

  deleteUser(user: User) {
    this.userStoreService.deleteUser(user);
  }

}
