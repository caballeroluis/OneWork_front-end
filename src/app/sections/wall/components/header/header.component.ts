import { Component } from '@angular/core';
import { StateStoreService } from 'src/app/services';

@Component({
  selector: 'wall-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(
    public stateStoreService: StateStoreService
  ) { }

}
