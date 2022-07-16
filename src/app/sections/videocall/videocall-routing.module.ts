import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideocallComponent } from '@sections/videocall/pages';

const routes: Routes = [
  {
    path: '', component: VideocallComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideocallRoutingModule { }
