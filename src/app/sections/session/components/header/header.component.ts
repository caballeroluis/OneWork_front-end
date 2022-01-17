import { Component, OnInit } from '@angular/core';
import { StateStoreService } from '@core/services';

@Component({
  selector: 'session-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
  }

}
