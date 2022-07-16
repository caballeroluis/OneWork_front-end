import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from '@sections/user/user-routing.module';
import { UserComponent } from '@sections/user/pages/user/user.component';
import { EditUserComponent, FooterComponent, HeaderComponent } from '@sections/user/components';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

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
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class UserModule { }
