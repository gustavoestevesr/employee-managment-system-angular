import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs';
import { User } from './../model/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API = 'http://localhost:3000/users';
  // private readonly API = '/assets/asdusers.jpg' // testar tratamento de erro

  constructor(private httpClient: HttpClient) {}

  login(user: User) {
    localStorage.setItem('token', "TokenQueSeriaGeradoPelaAPI" );
    localStorage.setItem('user', "objetoUsuárioRetornadoPelaAPI" );

    return this.httpClient.get<User>(this.API).pipe(first());
  }
}
