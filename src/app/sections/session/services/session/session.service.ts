import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@shared/models';
import { Session } from '@sections/session/models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
  ) { }

  register(user: User): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/users',
      user
    );
  }

  login(user: User): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/session/login',
      user
    );
  }

  refreshToken(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/session/refreshToken',
      {
        refreshToken: session.refreshToken
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/api/session/logout',
      {}
    );
  }

}
