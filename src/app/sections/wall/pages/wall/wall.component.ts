import { Component, OnInit } from '@angular/core';
import { User } from '@core/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@sections/wall/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(
    private userStoreService: UserStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (
      this.stateStoreService.state! &&
      this.stateStoreService.state.session?.token!.length > 0 &&
      !this.stateStoreService.state?.user!
    ) {
      this.userStoreService.apiUser();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

  apiUser() {
    this.userStoreService.apiUser();
  }

  removeUser(user: User) {
    this.userStoreService.removeUser(user);
  }

}
