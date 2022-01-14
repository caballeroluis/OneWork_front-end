import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { SessionStorageService } from '..';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private sessionStoreService: SessionStorageService
  ) { }

  apiUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: this.sessionStoreService.session?.token
      })
    };

    return this.http.get(
      environment.apiUrl +
      '/user',
      httpOptions
    );
  }
  
}
