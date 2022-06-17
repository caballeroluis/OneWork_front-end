import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { LoginComponent } from '@sections/session/pages';
import { RegisterComponent } from '@sections/session/pages';
import { ProfileComponent } from '@sections/session/pages';
import { ChangePasswordComponent } from '@sections/session/pages';
import { ChangeEmailComponent } from '@sections/session/pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent } from '@sections/session/components';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SessionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class SessionModule { }
