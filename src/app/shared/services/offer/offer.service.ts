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
    return this.http.post(
      environment.apiUrl +
        "/api/offers/worker/" + offer.workerAssigned?._id +
        "/recruiter/" + offer.recruiterAssigned?._id,
      offer
    );
  }

  updateOffer(offer: Offer): Observable<any> {
    return this.http.patch(
      environment.apiUrl +
        "/api/offers/" + offer._id,
      offer
    );
  }

  editOffer(offer: Offer): Observable<any> {
    return this.http.put(
      environment.apiUrl +
        "/api/offers/" + offer._id,
      offer
    );
  }

  deleteOffer(offer: Offer): Observable<any> {
    return this.http.delete(
      environment.apiUrl + '/api/offers/' + offer._id
    );
  }

}
