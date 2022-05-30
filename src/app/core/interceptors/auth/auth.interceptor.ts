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
import { StateStoreService } from '@core/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private stateSS: StateStoreService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = null;

    if (this.stateSS.session.token) {
      token = this.stateSS.session.token;
    }
    
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

}
