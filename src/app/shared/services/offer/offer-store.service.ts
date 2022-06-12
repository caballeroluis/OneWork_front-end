import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  constructor(
    private location: Location,
    private offerService: OfferService,
    private stateSS: StateStoreService,
    private notificationService: NotificationService
  ) { }
  
  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: CustomResponses) => {
      },
      (error: any) => {
      }
    );
  }
  
  getOfferById(offer: Offer): Promise<Offer> {
    return new Promise<Offer>((resolve) => {
      this.offerService.getOfferById(offer).subscribe(
        (response: CustomResponses) => {
          this.stateSS.offers[
            this.stateSS.offers.findIndex(_offer => _offer._id === offer._id)
          ] = response.result as Offer;
          resolve(response.result as Offer);
        },
        (error: any) => {
          resolve(new Offer());
        }
      );
    });
  }

  newOffer(offer: Offer) {
    this.offerService.newOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('Offer has been created in column "' + (response.result as Offer).status + '".');
      },
      (error: any) => {
      }
    );
  }

  changeStateOffer(offer: Offer) {
    this.offerService.changeStateOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('Offer has been moved.');
      },
      (error: any) => {
      }
    );
  }

  editOffer(offer: Offer) {
    this.offerService.editOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('Offer has been updated.');
        // this.location.back();
      },
      (error: any) => {
      }
    );
  }

  deleteOffer(offer: Offer) {
    this.offerService.deleteOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.notificationService.showSuccess('Offer has been deleted.');
      },
      (error: any) => {
      }
    );
  }
}
