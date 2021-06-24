import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated() {
    const token: any = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
