import { Injectable } from '@angular/core';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  constructor(
    private offerService: OfferService,
    private stateSS: StateStoreService
  ) { }
  
  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = response.results as Offer[];
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  newOffer(offer: Offer) {
    this.offerService.newOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = [ // TODO: hacer q se guarden bien
          ...this.stateSS.offers,
          response.result as Offer
        ];
        
        // this.router.navigate(['session', 'profile']);
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

}
