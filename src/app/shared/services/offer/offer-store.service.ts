import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { NotificationService, StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  constructor(
    private router: Router,
    private offerService: OfferService,
    private stateSS: StateStoreService,
    private notificationService: NotificationService
  ) { }
  
  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = response.results as Offer[];
        // this.notificationService.showSuccess('The offers have been updated'); // Todo: arreglar que los snackbars de success "tapen" (hagan desaparecer) a los de error
        // this.stateSS.offers.forEach(offer => {
        //   offer = {
        //     ...offer,
        //   }
        // });
      },
      (error: any) => {
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
        this.notificationService.showSuccess('Offer has been created');
      },
      (error: any) => {
      }
    );
  }

  updateOffer(offer: Offer) {
    this.offerService.updateOffer(offer).subscribe(
      (response: CustomResponses) => {
        // this.stateSS.offers[
        //   this.stateSS.offers.findIndex(_offer => _offer._id === offer._id)
        // ] = response.result as Offer;

        // this.stateSS.offers = this.stateSS.offers;
        this.getOffers();
        this.notificationService.showSuccess('Offer has been updated');
      },
      (error: any) => {
        this.getOffers(); // TODO: hacer quizá que no sea necesario esto
      }
    );
  }

  editOffer(offer: Offer) {
    this.offerService.editOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.getOffers(); // TODO: hacer sincro del state y borrar esta línea
        this.notificationService.showSuccess('Offer has been updated');
        this.router.navigate(['offers']);
      },
      (error: any) => {
        this.getOffers(); // TODO: hacer sincro del state y borrar esta línea
      }
    );
  }

  deleteOffer(offer: Offer) {
    this.offerService.deleteOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== offer._id);
        this.notificationService.showSuccess('Offer has been deleted');
      },
      (error: any) => {
        this.getOffers(); // TODO: hacer sincro del state y borrar esta línea
      }
    );
  }
}
