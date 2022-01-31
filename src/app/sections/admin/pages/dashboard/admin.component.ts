import { Component } from '@angular/core';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(
    private userStoreService: UserStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (
      this.stateStoreService.state.session.token.length > 0 &&
      this.stateStoreService.state.users.length === 0
    ) {
      this.userStoreService.getUsers();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

  getUsers() {
    this.userStoreService.getUsers();
  }

  deleteUser(user: User) {
    this.userStoreService.deleteUser(user);
  }

}
