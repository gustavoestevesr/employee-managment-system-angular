import { SharedModule } from './../shared/shared.module';
import { AppMaterialModule } from './../shared/app-material/app-material.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeesListComponent } from './employees-list/employees-list.component';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeFormComponent,
    EmployeesListComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
