import { Injectable } from '@angular/core';
import { NotificationService, StateStoreService } from '@core/services';
import { Offer, User } from '@shared/models';
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

    this.socket.fromEvent('changeStateOffer').subscribe(
      (payload: any) => {
        let offer: Offer = this.stateSS.offers.filter(_offer => _offer._id === payload.result._id)[0] as Offer;
        delete offer.status;
        offer.status = payload.result.status;

        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== payload.result._id);
        this.stateSS.offers = [
          ...this.stateSS.offers,
          offer
        ];

        this.notificationService.showSuccessPermanent('Someone has moved an offer to column "' + (payload.result as Offer).status + '".');
      }
    );

    this.socket.fromEvent('updateOffer').subscribe(
      (payload: any) => {
        let offer: Offer = {
          ...payload.result
        };

        offer.workerAssignedId = payload.result.workerAssigned;
        offer.recruiterAssignedId = payload.result.recruiterAssigned;
        offer.workerAssigned = this.stateSS.users.filter(_user => _user._id === offer.workerAssignedId)[0] as User;
        offer.recruiterAssigned = this.stateSS.users.filter(_user => _user._id === offer.recruiterAssignedId)[0] as User;

        this.stateSS.offers = this.stateSS.offers.filter(_offer => _offer._id !== offer._id);
        this.stateSS.offers = [
          ...this.stateSS.offers,
          offer
        ]

        this.notificationService.showSuccessPermanent('Someone has edited an offer in column "' + (payload.result as Offer).status + '".');
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
