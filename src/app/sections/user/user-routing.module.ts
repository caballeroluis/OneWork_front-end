import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components';
import { UserComponent } from './pages/dashboard/user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'edit-user/:_id', component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
