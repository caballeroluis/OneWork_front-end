import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterWorkerComponent } from './pages/register-worker/register-worker.component';
import { RegisterRecruiterComponent } from './pages/register-recruiter/register-recruiter.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register-worker', component: RegisterWorkerComponent
  },
  {
    path: 'register-recruiter', component: RegisterRecruiterComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: '', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
