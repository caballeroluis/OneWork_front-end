import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
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

}
