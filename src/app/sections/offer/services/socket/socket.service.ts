import { Injectable } from '@angular/core';
import { StateStoreService } from '@core/services';
import { Socket } from 'ngx-socket-io';  

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private socket: Socket,
    public stateSS: StateStoreService
  ) { }

  fetchOffers() {
    this.socket.emit('offers');
  } 

  onFetchOffers() {
    return this.socket.fromEvent('offers');
  }

  initializeOfferSocket() {
    // this.fetchOffers();
    this.onFetchOffers().subscribe(
      (data: any) => {
        console.log("🚀 ~ file: socket.service.ts ~ line 27 ~ SocketService ~ initializeOfferSocket ~ data", data)
        this.stateSS.offers = data
      }
    );
  }

}
