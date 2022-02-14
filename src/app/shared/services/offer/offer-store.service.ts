import { Injectable } from '@angular/core';
import { State } from '@core/models';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { StateStoreService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  constructor(
    private offerService: OfferService,
    private stateStoreService: StateStoreService
  ) { }

  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: Offer) => {
        this.stateStoreService.update(
          {
            offers: response as Offer[]
          } as State
        );
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
