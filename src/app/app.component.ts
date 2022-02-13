import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { SessionStoreService } from '@sections/session/services';
import { UserStoreService } from '@shared/services';

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
  ) { }

  test() {
    console.log('📂 User data', this.userStoreService.users);
    console.log('📂 Session data', this.sessionStoreService.session);
    
    // console.log('👀 User observers', this.userStoreService.users$['source']);
    console.log('👀 User observers', this.userStoreService.users$['source']['observers']); // TODO: set "strict": true in tsconfig
    console.log('👀 User observers', this.userStoreService.users$['source']['observers'].length); // For use this set "strict": false in tsconfig
  
      
    // console.log('👀 Session observers', this.sessionStoreService.session$['source']);
    console.log('👀 Session observers', this.sessionStoreService.session$['source']['observers']); // TODO: set "strict": true in tsconfig
    console.log('👀 Session observers', this.sessionStoreService.session$['source']['observers'].length); // For use this set "strict": false in tsconfig

  }

}
