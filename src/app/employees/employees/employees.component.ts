import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Employee } from './../model/employee';
import { EmployeesService } from './../services/employees.service';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

/**
 * @title Table with filtering
 */
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent {

  employees$: Observable<Employee[]> | null = null;

  constructor(
    private employeesService: EmployeesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.employees$ = this.employeesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar colaboradores.');
        return of([]);
      })
    );

  }


  onLogout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  refresh() {
    this.employees$ = this.employeesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar colaboradores.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(employee: Employee) {
    this.router.navigate(['edit', employee.cpf], { relativeTo: this.route });
  }

  onRemove(employee: Employee) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.employeesService.remove(employee.cpf).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Colaborador removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover Colaborador.')
        );
      }
    });
  }
}
