import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { User } from '@core/models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  apiUser(): Observable<any> {
    return this.http.get(
      environment.apiUrl +
      '/user'
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      '/user',
      {
        email: user.email,
        password: user.password,
        role: user.role
      }
    );
  }
  
}
