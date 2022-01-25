import { Component, DoCheck } from '@angular/core';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@shared/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements DoCheck {

  constructor(
    private userStoreService: UserStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (
      this.stateStoreService.state! &&
      this.stateStoreService.state.session?.token!.length > 0 &&
      !this.stateStoreService.state?.user!
    ) {
      this.userStoreService.getUser();
    }
  }

  ngDoCheck(): void {
    console.log("🚀 ~ ADMIN COMPONENT file: admin.component.ts ~ line 29 ~ AdminComponent ~ ngDoCheck ~ ngDoCheck", 'ngDoCheck')
  }

  getIdTrackFn = (i: number, item: any) => item.id;

  getUser() {
    this.userStoreService.getUser();
  }

  deleteUser(user: User) {
    this.userStoreService.deleteUser(user);
  }

}
