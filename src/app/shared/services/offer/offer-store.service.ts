import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { StateStoreService } from '@core/services';
import { CustomResponses } from '@core/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  constructor(
    private router: Router,
    private offerService: OfferService,
    private stateSS: StateStoreService,
    public snackBar: MatSnackBar
  ) { }
  
  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = response.results as Offer[];
        // this.showSnackBar('The board has been updated'); // Todo: arreglar que los snackbars de success "tapen" (hagan desaparecer) a los de error
        // this.stateSS.offers.forEach(offer => {
        //   offer = {
        //     ...offer, // Todo: ternimar datepicker
        //     videoCallTrueDate: offer.videoCallDate?.substring(0, 9),
        //     videoCallTrueHour: offer.videoCallDate?.substring(11, 15)
        //   }
        // });
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
        this.showSnackBar('Offer has been created');
      },
      (error: any) => {
        throw new Error(error);
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
        this.showSnackBar('Offer has been updated');
      },
      (error: any) => {
        this.getOffers(); // TODO: hacer quizá que no sea necesario esto
        throw new Error(error);
      }
    );
  }

  editOffer(offer: Offer) {
    this.offerService.editOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.getOffers(); // TODO: hacer sincro del state y borrar esta línea
        this.showSnackBar('Offer has been updated');
        this.router.navigate(['board']);
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  deleteOffer(offer: Offer) {
    this.offerService.deleteOffer(offer).subscribe(
      (response: CustomResponses) => {
        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== offer._id);
        this.showSnackBar('Offer has been deleted');
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  showSnackBar(text: string) {
    this.snackBar.open(text, 'OK', {
      duration: 2 * 1000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      // Todo: undo button
    });
  }

}
