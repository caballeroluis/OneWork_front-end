import { Component } from '@angular/core';
import { SessionStoreService } from '@sections/session/services';
import { OfferStoreService } from '@shared/services';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent {

  constructor(
    public offerStoreService: OfferStoreService,
    private sessionStoreService: SessionStoreService
  ) { }

  ngAfterViewInit() {
    if (
      this.sessionStoreService.session.token.length > 0 &&
      (!this.offerStoreService.offers || this.offerStoreService.offers.length === 0)
    ) {
      this.offerStoreService.getOffers();
    }
  }

  getIdTrackFn = (i: number, item: any) => item._id;

}
