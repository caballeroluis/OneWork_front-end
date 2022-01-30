import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Session } from '@sections/session/models';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient,
  ) { }

  register(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/api/users',
      {
        email: session.user.email,
        password: session.user.password,
        name: session.user.name,
        role: session.user.role
      }
    );
  }

  login(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/api/session/login',
      {
        email: session.user.email,
        password: session.user.password
      }
    );
  }

  loginMock(session: Session): Observable<any> {
    return this.http.get(
      environment.apiMockUrl +
      '/api/session'
    );
  }

  updateUserProfile(session: Session): Observable<any> {
    return this.http.put(
      environment.apiUrl +
      '/api/users/' +
      session.user._id,
      {
        email: session.user.email,
        password: session.user.password,
        name: session.user.name,
        role: session.user.role
      }
    );
  }

}
