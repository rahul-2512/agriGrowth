import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService) {}
  // ...
  public isAuthenticated() {
    const token: any = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token) {
      // console.log(token);
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }
}
