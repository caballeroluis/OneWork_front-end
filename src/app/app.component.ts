import { Component } from '@angular/core';
import { SessionStorageService, UserStorageService } from '@core/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  environmentProduction = environment.production;

  constructor(
    private _userStoreService: UserStorageService,
    private _sessionStoreService: SessionStorageService
  ) { }

  test() {
    console.log('📂user', this._userStoreService.user);
    console.log('📂session', this._sessionStoreService.session);

    console.log('👀user', this._userStoreService.user$['source']);
    console.log('👀session', this._sessionStoreService.session$['source']);
  }

}
