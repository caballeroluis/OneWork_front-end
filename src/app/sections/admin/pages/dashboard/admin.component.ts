import { Component } from '@angular/core';
import { User } from '@shared/models';
import { StateStoreService } from '@core/services';
import { UserStoreService } from '@shared/services';
import { Subscription } from 'rxjs';
import { State } from '@core/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  private stateSubscription!: Subscription;
  public state!: State;

  constructor(
    private userStoreService: UserStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.stateStoreService.state$.subscribe(state => {
      this.state = state;
    });
  }

  ngAfterViewInit() {
    if (
      // this.state.session.token.length > 0 && // TODO: descomentar esto cuando back pida session aquí
      (!this.state.users || this.state.users.length === 0)
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

  ngOnDestroy() {
    console.log("🚀 ~ file: admin.component.ts ~ line 53 ~ AdminComponent ~ ngOnDestroy ~ ngOnDestroy")
    this.stateSubscription.unsubscribe();
  }

}
