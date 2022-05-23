import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const notifier = this.injector.get(NotificationService);

    return next.handle(request).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // client-side error
          notifier.showError(error.error.message);
        } else { 
          // server-side error
          if (error.error.message!) {
            notifier.showError(error.error.message);
          }

          if (error.error.errors?.length > 0) {
            error.error.errors.forEach((_error: { msg: string; }) => {
              notifier.showError(_error.msg);
            });
          } else {
            notifier.showError(error.error.errors.msg);
          }
          
          return throwError(error);
        }
        return throwError(error);
      })
    )
  }
}