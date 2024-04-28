import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeesService } from './../services/employees.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {

  estadosBrasileiros: string[] = [
    "Acre (AC)", "Alagoas (AL)", "Amapá (AP)", "Amazonas (AM)", "Bahia (BA)", "Ceará (CE)", "Distrito Federal (DF)", "Espírito Santo (ES)", "Goiás (GO)", "Maranhão (MA)", "Mato Grosso (MT)", "Mato Grosso do Sul (MS)", "Minas Gerais (MG)", "Pará (PA)", "Paraíba (PB)", "Paraná (PR)", "Pernambuco (PE)", "Piauí (PI)", "Rio de Janeiro (RJ)", "Rio Grande do Norte (RN)", "Rio Grande do Sul (RS)", "Rondônia (RO)", "Roraima (RR)", "Santa Catarina (SC)", "São Paulo (SP)", "Sergipe (SE)", "Tocantins (TO)"
  ];

  formEmployee = this.formBuilder.group({
    id: [''],
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    address: this.formBuilder.group({
      zip_code: ['', [Validators.required]],
      street: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
    }),
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: EmployeesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // Código seta os valores no formulário ao editar, porém precisa do back-end
  ngOnInit(): void {
    const employeeID = this.route.snapshot.params['id'];
    if(employeeID) {
      this.service.loadByCPF(employeeID).pipe(first()).subscribe((employee) => {
        this.formEmployee.setValue({
          id: employee.id,
          name: employee.name,
          email: employee.email,
          cpf: employee.cpf,
          address: {
            zip_code: employee.address.zip_code,
            street: employee.address.street,
            neighborhood: employee.address.neighborhood,
            state: employee.address.state,
            city: employee.address.city,
          }
        });
      })
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.service.save(this.formEmployee.getRawValue()).subscribe({
      next: () => {
        this.onSuccess();
      },
      error: () => {
        this.onError();
      },
    });
  }

  selectedFile: any = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  private onError() {
    this.snackBar.open('Error saving collaborator.', '', { duration: 5000 });
  }

  private onSuccess() {
    this.snackBar.open('Collaborator successfully saved!', '', {
      duration: 5000,
    });
    this.onCancel();
  }

}
