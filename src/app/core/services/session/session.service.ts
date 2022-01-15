import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
  ) { }

  login(user: User): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/login',
      {
        email: user.email,
        password: user.password
      }
    );
  }
}
