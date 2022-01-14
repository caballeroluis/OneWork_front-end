import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionStorageService } from '@core/services';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private sessionStoreService: SessionStorageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;

    if (this.sessionStoreService.session) {
      this.sessionStoreService.session$.subscribe(session => {
        token = session.token;
      });
    }
    
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: token
          // authorization: `Bearer ${ token }`
        }
      });
    }
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigate(['session', 'login']);
        }

        return throwError(err);
      })
    );
  }

}
