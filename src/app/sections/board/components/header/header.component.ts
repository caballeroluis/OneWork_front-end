import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'board-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor(
    public stateSS: StateStoreService
  ) { }

  getIdTrackFn = (i: number, item: any) => item._id;

}
