import { Component, OnInit } from '@angular/core';
import { User } from '@core/models';
import { SessionStoreService, UserStoreService } from '@core/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(
    public userStoreService: UserStoreService,
    public sessionStoreService: SessionStoreService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.sessionStoreService.session! && this.userStoreService.user?.length === 0) {
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
