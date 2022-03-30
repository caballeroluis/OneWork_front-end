import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './pages/board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/board/components';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select'; 
import { EditOfferComponent } from './pages/edit-offer/edit-offer.component';

@NgModule({
  declarations: [
    BoardComponent,
    HeaderComponent,
    FooterComponent,
    NewOfferComponent,
    EditOfferComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule
  ]
})
export class BoardModule { }
