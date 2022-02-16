import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOfferComponent } from './pages/new-offer/new-offer.component';
import { WallComponent } from './pages/wall/wall.component';

const routes: Routes = [
  {
    path: '', component: WallComponent
  },
  {
    path: 'new-offer', component: NewOfferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallRoutingModule { }
