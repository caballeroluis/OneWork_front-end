import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WallRoutingModule } from './wall-routing.module';
import { WallComponent } from './pages/wall/wall.component';
import { FooterComponent, HeaderComponent } from '@sections/wall/components';


@NgModule({
  declarations: [
    WallComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    WallRoutingModule
  ]
})
export class WallModule { }
