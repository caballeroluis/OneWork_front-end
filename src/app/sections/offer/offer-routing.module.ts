import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { OfferComponent } from './pages/offer/offer.component';
import { EditOfferComponent } from './pages/edit-offer/edit-offer.component';

const routes: Routes = [
  {
    path: '', component: OfferComponent
  },
  {
    path: 'new-offer', component: NewOfferComponent
  },
  {
    path: 'new-offer/:workerAssignedId', component: NewOfferComponent
  },
  {
    path: 'edit-offer/:_id', component: EditOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfferRoutingModule { }
