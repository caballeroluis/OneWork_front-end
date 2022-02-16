import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Offer } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(
    private http: HttpClient
  ) { }

  getOffers(): Observable<any> {
    return this.http.get(
      environment.apiUrl + '/api/offers'
    );
  }

  newOffer(offer: Offer): Observable<any> {
    return this.http.post( // TODO: esperar cambio en back-end
      // environment.apiUrl +
      //   "/api/offers/worker/" + offer.worker?.id +
      //   "/recruiter/" + offer.recruiter?.id,
        environment.apiUrl +
        "/api/offers?worker=" + offer.worker?.id +
        "&recruiter=" + offer.recruiter?.id,
      offer
    );
  }

}
