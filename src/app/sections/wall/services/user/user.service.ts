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

  getUser(): Observable<any> {
    return this.http.get(
      environment.apiUrl +
      '/user'
    );
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(
      environment.apiUrl +
      '/user/' +
      user._id
    );
  }

}
