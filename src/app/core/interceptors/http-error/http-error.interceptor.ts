import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService, StateStoreService } from '@core/services';
import { SessionStoreService } from '@sections/session/services';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private injector: Injector,
    private stateSS: StateStoreService,
    private sessionSS: SessionStoreService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const notifier = this.injector.get(NotificationService);

    return next.handle(request).pipe(
      retry(0),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          if (errorResponse.error.msg === 'jwt expired' || errorResponse.error.msg === 'You are not authorized to perform this action') { // TODO: acomodar esto tras ver qué pasa con la API y el refreshtoken
            this.stateSS.session = {
            ...this.stateSS.session,
            token: ''
          };
            this.sessionSS.refreshToken();
          } else {
            notifier.showError(errorResponse.error.msg);
            return throwError(errorResponse);
          }
        }

        if (errorResponse.error instanceof ErrorEvent) {
          // client-side error
          notifier.showError(errorResponse.error.message);
          // notifier.showError(errorResponse.error.msg);
        } else { 
          // server-side error
          if (errorResponse.error.msg!) {
            notifier.showError(errorResponse.error.msg);
          }

          if (errorResponse.error.errors?.length > 0) {
            errorResponse.error.errors.forEach((_error: { msg: string; }) => {
              notifier.showError(_error.msg);
            });
          }
        }
        return throwError(errorResponse);
      })
    )
  }
}