import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Employee } from './../model/employee';
import { EmployeesService } from './../services/employees.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeResolver implements Resolve<Employee> {
  constructor(private service: EmployeesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Employee> {
    {
      if (route.params && route.params['cpf']) {
        return this.service.loadByCPF(route.params['cpf']);
      }
      return of({
        id: '',
        name: '',
        cpf: '',
        photo: '',
        email: '',
        active: '',
        hiringDate: '',
        address: { zip_code: '', city: '', street: '', neighborhood: '', state: '' },
      });
    }
  }
}
