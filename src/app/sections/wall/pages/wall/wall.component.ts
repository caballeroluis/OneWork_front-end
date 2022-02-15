import { Component } from '@angular/core';
import { StateStoreService } from '@core/services';
import { OfferStoreService } from '@shared/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent {

  constructor(
    private offerStoreService: OfferStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (!this.stateStoreService.state.offers || this.stateStoreService.state.offers.length === 0) {
      this.offerStoreService.getOffers();
    }
  }

  getOffers() {
    this.offerStoreService.getOffers();
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
