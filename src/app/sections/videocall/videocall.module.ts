import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideocallRoutingModule } from './videocall-routing.module';
import { VideocallComponent } from '@sections/videocall/pages';
import { FooterComponent, HeaderComponent } from '@sections/videocall/components';


@NgModule({
  declarations: [
    VideocallComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    VideocallRoutingModule
  ]
})
export class VideocallModule { }
