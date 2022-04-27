import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LoggingService } from '@core/services/';
import { ErrorService } from '@core/services';
import { NotificationService } from '@core/services';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      console.log("🚀 ~ file: rHandlor ~ error", error.status)
      // Server Error
      message = errorService.getServerMessage(error);
      stackTrace = errorService.getServerStack(error);
      // notifier.showError(message); // Todo: arreglar
      notifier.showError('Server error');
    } else {
      // Client Error
      message = errorService.getClientMessage(error);
      stackTrace = errorService.getClientStack(error);
      // notifier.showError(message); // Todo: arreglar
    }
    
    // Always log errors
    logger.logError(message, stackTrace);
    
    console.log(typeof error);
    console.error("🚀 ~ file: global-error-haerror", error)
  }
}