import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent
  },
  {
    path: 'user-detail/:_id', component: EditUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
