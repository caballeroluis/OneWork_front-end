import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WallRoutingModule } from './wall-routing.module';
import { WallComponent } from './pages/wall/wall.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/wall/components';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';


@NgModule({
  declarations: [
    WallComponent,
    HeaderComponent,
    FooterComponent,
    NewOfferComponent
  ],
  imports: [
    CommonModule,
    WallRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class WallModule { }
