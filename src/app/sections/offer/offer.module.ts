import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferRoutingModule } from './offer-routing.module';
import { OfferComponent } from './pages/offer/offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/offer/components';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select'; 
import { EditOfferComponent } from './pages/edit-offer/edit-offer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    OfferComponent,
    HeaderComponent,
    FooterComponent,
    NewOfferComponent,
    EditOfferComponent
  ],
  imports: [
    CommonModule,
    OfferRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    DragDropModule,
    MatSelectModule,
    MatDatepickerModule, // TODO: reemplazar quizá mejor por @angular-material-components/datetime-picker
    MatNativeDateModule
  ]
})
export class OfferModule { }
