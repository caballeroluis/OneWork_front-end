import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  environmentProduction = environment.production;

  constructor(
    private stateStoreService: StateStoreService,
  ) { }

  test() {
    console.log('📂 Session data', this.stateStoreService.state.session);
    console.log('📂 User data', this.stateStoreService.state.users);
    console.log('📂 Offer data', this.stateStoreService.state.offers);
    
    // console.log('👀 State observers', this.stateStoreService.state$['source']);
    console.log('👀 State observers', this.stateStoreService.state$['source']['observers']); // TODO: set "strict": true in tsconfig
    console.log('👀 State observers', this.stateStoreService.state$['source']['observers'].length); // For use this set "strict": false in tsconfig

  }

}
