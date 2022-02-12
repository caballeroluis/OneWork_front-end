import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangePassword } from './pages/change-password/change-password.component';
import { ChangeEmail } from './pages/change-email/change-email.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'change-password', component: ChangePassword
  },
  {
    path: 'change-email', component: ChangeEmail
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
