import { Injectable } from '@angular/core';
import { NotificationService, StateStoreService } from '@core/services';
import { Offer } from '@shared/models';
import { OfferStoreService } from '@shared/services';
import { Socket } from 'ngx-socket-io';  

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    private notificationService: NotificationService,
    public stateSS: StateStoreService,
    public offerSS: OfferStoreService
  ) { }

  initializeOfferSocket() {
    this.socket.connect();

    this.socket.fromEvent('offers').subscribe(
      (payload: any) => {
        this.stateSS.offers = payload;
      }
    );

    this.socket.fromEvent('newOffer').subscribe(
      (payload: any) => {
        this.stateSS.offers = [
          ...this.stateSS.offers,
          payload.result as Offer
        ];

        this.notificationService.showSuccessPermanent('Someone has created an offer new offer has been created in column "' + (payload.result as Offer).status + '".');
      }
    );

    this.socket.fromEvent('updateOffer').subscribe(
      (payload: any) => {
        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== payload.result._id);
        this.stateSS.offers = [
          ...this.stateSS.offers,
          payload.result as Offer
        ];

        this.notificationService.showSuccessPermanent('Someone has edited an offer in column "' + (payload.result as Offer).status + '".');
      }
    );

    this.socket.fromEvent('changeStateOffer').subscribe(
      (payload: any) => {
        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== payload.result._id);
        this.stateSS.offers = [
          ...this.stateSS.offers,
          payload.result
        ];

        this.notificationService.showSuccessPermanent('Someone has moved an offer to column "' + (payload.result as Offer).status + '".');
      }
    );

    this.socket.fromEvent('deleteOffer').subscribe(
      (payload: any) => {
        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== payload.result._id);

        this.notificationService.showSuccessPermanent('Someone has removed an offer.');
      }
    );
  }

  disconnect() {
    this.socket.disconnect('disconnect');
  }

}
