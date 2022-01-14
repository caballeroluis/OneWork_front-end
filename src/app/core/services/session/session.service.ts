import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/login',
      {
        email: email,
        password: password
      }
    );
  }
}
