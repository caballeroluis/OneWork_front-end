import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateStoreService } from '@core/services';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private stateSS: StateStoreService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.stateSS.userInterface.showLoader = true;
    return next.handle(request).pipe(
      finalize(() => {
        this.stateSS.userInterface.showLoader = false;
      })
    );
  }
}
