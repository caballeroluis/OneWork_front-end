import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterWorkerComponent } from './pages/register-worker/register-worker.component';
import { RegisterRecruiterComponent } from './pages/register-recruiter/register-recruiter.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/session/components';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterWorkerComponent,
    RegisterRecruiterComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SessionModule { }
