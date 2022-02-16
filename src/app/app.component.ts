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
    private stateSS: StateStoreService,
  ) { }

  test() {
    console.log('📂 Store data', this.stateSS.state);
    console.log('📂 Users data', this.stateSS.users);
    console.log('👀 Store observers', this.stateSS.state$['source']);
    console.log('👀 Users observers', this.stateSS.users$['source']);
  }

}
