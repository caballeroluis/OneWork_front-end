import { Component, OnInit } from '@angular/core';
import { State } from '@core/models';
import { StateStoreService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wall-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  private stateSubscription!: Subscription;
  public state!: State;

  constructor(
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.stateSubscription = this.stateStoreService.state$.subscribe(state => {
      this.state = state;
    });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }
  
}
