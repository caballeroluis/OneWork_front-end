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

  registerWorker(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/api/users/worker',
      {
        email: session.user.email,
        password: session.user.password,
        name: session.user.name
      }
    );
  }

  registerRecruiter(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/api/users/recruiter',
      {
        email: session.user.email,
        password: session.user.password,
        role: session.user.name
      }
    );
  }

  login(session: Session): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/api/login',
      {
        email: session.user.email,
        password: session.user.password
      }
    );
  }

  updateUserProfile(session: Session): Observable<any> {
    return this.http.put(
      environment.apiUrl +
      '/user/' +
      session.user._id,
      {
        email: session.user.email,
        password: session.user.password,
      }
    );
  }

}
