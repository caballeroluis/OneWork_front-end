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
    console.log('📂 Store data', this.stateStoreService.state);
    console.log('👀 Store observers', this.stateStoreService.state$['source']);
  }

}
