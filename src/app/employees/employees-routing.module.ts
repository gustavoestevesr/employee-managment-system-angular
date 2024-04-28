import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeResolver } from './guards/employee.resolver';

const routes: Routes = [
  { path:'', component: EmployeesComponent },
  { path:'new', component: EmployeeFormComponent, resolve: { employee: EmployeeResolver } },
  { path:'edit/:id', component: EmployeeFormComponent, resolve: {employee: EmployeeResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
