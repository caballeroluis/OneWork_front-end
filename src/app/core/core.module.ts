import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors';
import { HttpErrorInterceptor } from '@core/interceptors';
import { LoaderInterceptor } from '@core/interceptors';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '@env/environment';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
		SocketIoModule.forRoot(
      {
        url: environment.apiUrl,
        options: {
          transports: ['websocket']
        }
      } as SocketIoConfig
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ]
})
export class CoreModule { }
