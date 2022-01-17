import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

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
      this.userStoreService.getUser();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

  getUser() {
    this.userStoreService.getUser();
  }

  deleteUser(user: User) {
    this.userStoreService.deleteUser(user);
  }

}
