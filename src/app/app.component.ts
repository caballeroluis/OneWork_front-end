import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';
import { environment } from '@env/environment';
import { SessionStoreService } from '@sections/session/services';
import { OfferStoreService, UserStoreService } from '@shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  environmentProduction = environment.production;

  constructor(
    private sessionStoreService: SessionStoreService,
    private userStoreService: UserStoreService,
    private offerStoreService: OfferStoreService,
    private stateStoreService: StateStoreService,
  ) { }

  test() {
    // console.log('📂 User data', this.userStoreService.users);
    // console.log('📂 Session data', this.sessionStoreService.session);
    // console.log('📂 Offer data', this.offerStoreService.offers);

    console.log('📂 State', this.stateStoreService.state);
    
    // console.log('👀 User observers', this.userStoreService.users$['source']);
    // console.log('👀 User observers', this.userStoreService.users$['source']['observers']); // TODO: set "strict": true in tsconfig
    // console.log('👀 User observers', this.userStoreService.users$['source']['observers'].length); // For use this set "strict": false in tsconfig
  
      
    // console.log('👀 Session observers', this.sessionStoreService.session$['source']);
    // console.log('👀 Session observers', this.sessionStoreService.session$['source']['observers']); // TODO: set "strict": true in tsconfig
    // console.log('👀 Session observers', this.sessionStoreService.session$['source']['observers'].length); // For use this set "strict": false in tsconfig
    
      
    // console.log('👀 Offer observers', this.offerStoreService.offers$['source']);
    // console.log('👀 Offer observers', this.offerStoreService.offers$['source']['observers']); // TODO: set "strict": true in tsconfig
    // console.log('👀 Offer observers', this.offerStoreService.offers$['source']['observers'].length); // For use this set "strict": false in tsconfig

    console.log('👀 State observers', this.stateStoreService.state$['source']);
  }

}
