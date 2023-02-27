import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    AppMaterialModule
  ]
})
export class UsersModule { }
