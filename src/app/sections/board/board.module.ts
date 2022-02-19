import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/board/components';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    BoardComponent,
    HeaderComponent,
    FooterComponent,
    NewOfferComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class BoardModule { }
