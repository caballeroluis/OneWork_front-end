import { Component } from '@angular/core';
import { SessionStoreService, UserStoreService } from '@core/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  environmentProduction = environment.production;

  constructor(
    private userStoreService: UserStoreService,
    private sessionStoreService: SessionStoreService
  ) { }

  test() {
    console.log('📂user', this.userStoreService.user);
    console.log('📂session', this.sessionStoreService.session);
    console.log('📂state', this.sessionStoreService.state);

    console.log('👀user', this.userStoreService.user$['source']);
    console.log('👀session', this.sessionStoreService.session$['source']);
    console.log('👀state', this.sessionStoreService.state$['source']);
  }

}
