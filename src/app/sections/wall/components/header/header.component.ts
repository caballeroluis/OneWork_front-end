import { Component } from '@angular/core';
import { SessionStoreService } from '@sections/session/services';

@Component({
  selector: 'wall-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(
    public sessionStoreService: SessionStoreService
  ) { }

}
