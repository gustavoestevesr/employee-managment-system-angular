import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, first, Observable } from 'rxjs';
import { Employee } from './../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly API = '/assets/employees.json';
  // private readonly API = '/assets/asdemployees.jpg' // testar tratamento de erro

  employees$: Observable<Employee[]> | null = null;

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Employee[]>(this.API).pipe(first(), delay(100));
  }

  loadByCPF(cpf: string) {
    return this.httpClient.get<Employee>(`${this.API}/${cpf}`).pipe(first());
  }

  save(record: Partial<Employee>) {
    if (record.cpf) {
      // se o objeto conter um ID vamos atualizar
      return this.update(record);
    } // se não, vamos salvar
    return this.create(record);
  }

  private create(record: Partial<Employee>) {
    return this.httpClient.post<Employee>(this.API, record).pipe(first());
  }

  private update(record: Partial<Employee>) {
    return this.httpClient
      .put<Employee>(`${this.API}/${record.cpf}`, record)
      .pipe(first());
  }

  remove(cpf: string) {
    return this.httpClient.delete(`${this.API}/${cpf}`).pipe(first());
  }
}
