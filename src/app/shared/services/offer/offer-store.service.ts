import { Injectable } from '@angular/core';
import { Offer } from '@shared/models';
import { OfferService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferStoreService {

  private readonly _offers = new BehaviorSubject<Offer[]>([]);
  readonly offers$ = this._offers.asObservable();

  constructor(
    private offerService: OfferService
  ) { }

  get offers(): Offer[] {
    return this._offers.getValue();
  }

  set offers(val: Offer[]) {
    this._offers.next(val);
  }
  
  getOffers() {
    this.offerService.getOffers().subscribe(
      (response: Offer) => {
        this.offers = response as Offer[];
      },
      (error: any) => {
        throw new Error(error);
      }
    );
  }

  clear() {
    this.offers = [];
  }

}
