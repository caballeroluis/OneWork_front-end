import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '@core/services';
import { StateStoreService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(
    private injector: Injector,
    private stateSS: StateStoreService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const notifier = this.injector.get(NotificationService);

    return next.handle(request).pipe(
      retry(0),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          notifier.showError(errorResponse.error.msg);
          return throwError(errorResponse);
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