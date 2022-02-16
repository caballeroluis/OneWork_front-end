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
    private offerSS: OfferStoreService,
    public stateSS: StateStoreService
  ) { }

  ngAfterViewInit() {
    if (!this.stateSS.state.offers || this.stateSS.state.offers.length === 0) {
      this.offerSS.getOffers();
    }
  }

  getOffers() {
    this.offerSS.getOffers();
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
