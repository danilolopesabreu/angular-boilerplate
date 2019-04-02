import { UserService } from './../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TokenService } from './token/token.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }
  
  authenticate(userName: string, password: string) {

    return this.http.post(
      API_URL + '/user/login',
      { userName, password },
      { observe: 'response' }//dar acesso ao response para res.headers.get poder acessar header
    )
    .pipe(tap(res => {
      const authToken = res.headers.get('x-access-token');
      this.userService.setToken(authToken);
      console.log(`User ${userName} authenticated with token ${authToken}`);
  }));
  }
}