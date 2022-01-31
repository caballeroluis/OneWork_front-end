import { Component, OnInit } from '@angular/core';
import { StateStoreService } from '@core/services';
import { OfferStoreService } from '@shared/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(
    private offerStoreService: OfferStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (
      this.stateStoreService.state.session.token.length > 0 &&
      this.stateStoreService.state.offers.length === 0
    ) {
      this.offerStoreService.getOffers();
    }
  }

  getIdTrackFn = (i: number, item: any) => item.id;

}
