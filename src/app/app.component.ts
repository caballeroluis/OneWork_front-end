import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  env = environment;

  constructor(
    public stateSS: StateStoreService
  ) { }

  printState() {
    console.log('📂 Session data', this.stateSS.session);
    console.log('📂 Users data', this.stateSS.users);
    console.log('📂 Offers data', this.stateSS.offers);
    console.log('👀 SmallScreen observers', this.stateSS.smallScreen$['source']);
    console.log('👀 Session observers', this.stateSS.session$['source']);
    console.log('👀 Users observers', this.stateSS.users$['source']);
    console.log('👀 Offers observers', this.stateSS.offers$['source']);
  }

}
