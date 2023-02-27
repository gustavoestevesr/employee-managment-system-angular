import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {

  formLogin: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UsersService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.formLogin.valid) {
      this.service.login(this.formLogin.value).subscribe({
        next: () => {
          this.onSuccess();
        },
        error: () => {
          this.onError();
        },
      });
    } else {
      this.onError();
    }
  }

  private goToEmployees() {
    this.router.navigate(['employees']);
  }

  private onError() {
    this.snackBar.open('Error authenticating the user.', '', { duration: 5000 });
  }

  private onSuccess() {
    this.snackBar.open('User authenticated successfully!', '', {
      duration: 5000,
    });
    this.goToEmployees();
  }

  onRegister() {}
}
