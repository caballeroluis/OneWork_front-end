import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UseComponent } from './pages/use/use.component';

const routes: Routes = [
  {
    path: '', component: UseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
