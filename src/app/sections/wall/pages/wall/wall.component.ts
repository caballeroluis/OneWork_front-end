import { Component, OnInit } from '@angular/core';
import { StateStoreService } from '@core/services';
import { Offer } from '@shared/models';
import { OfferStoreService } from '@shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  private state!: Subscription;
  public offers!: Offer[];

  constructor(
    private offerStoreService: OfferStoreService,
    public stateStoreService: StateStoreService
  ) { }

  ngOnInit(): void {
    this.state = this.stateStoreService.state$.subscribe(state => {
      this.offers = state.offers;
    });
  }

  ngAfterViewInit() {
    if (
      this.stateStoreService.state.session.token.length > 0 &&
      this.stateStoreService.state.offers.length === 0
    ) {
      this.offerStoreService.getOffers();
    }
  }

  ngOnDestroy() {
    this.state.unsubscribe();
  }

  getIdTrackFn = (i: number, item: any) => item.id;

}
