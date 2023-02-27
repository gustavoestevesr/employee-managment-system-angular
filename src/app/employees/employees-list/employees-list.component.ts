import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from './../model/employee';
import { EmployeesService } from './../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {

  @Input() employees: Employee[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns: string[] = ['photo', 'name', 'email', 'cpf', 'zip_code', 'neighborhood', 'street', 'city', 'state', 'active', 'hiringDate', 'actions'];

  constructor(private employeeService: EmployeesService){}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(employee: Employee) {
    this.edit.emit(employee);
  }

  onDelete(employee: Employee) {
    this.remove.emit(employee);
  }

}
