import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './pages/dashboard/user.component';
import { EditUserComponent, FooterComponent, HeaderComponent } from '@sections/user/components';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class UserModule { }
