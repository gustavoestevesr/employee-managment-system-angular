import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, filter, first, Observable } from 'rxjs';
import { Employee } from './../model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly API = 'http://localhost:3000/employees';
  // private readonly API = '/assets/asdemployees.jpg' // testar tratamento de erro

  employees$: Observable<Employee[]> | null = null;

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Employee[]>(this.API).pipe(first(), delay(100));
  }

  loadByCPF(id: string) {
    return this.httpClient.get<Employee>(`${this.API}/${id}`).pipe(first());
  }

  save(record: Partial<Employee>) {
    if (record.id) {
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
      .put<Employee>(`${this.API}/${record.id}`, record)
      .pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
