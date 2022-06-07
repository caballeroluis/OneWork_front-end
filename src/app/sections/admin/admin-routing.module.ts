import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components';
import { AdminComponent } from './pages/dashboard/admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent
  },
  {
    path: 'edit-user/:_id', component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
