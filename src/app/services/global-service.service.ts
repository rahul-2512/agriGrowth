import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  rt: any;
  userInfo: any;
  accessToken: any;
  constructor(private router: Router) {}

  setRequestType(id: any) {
    this.rt = id;
  }
  getRequestType() {
    return this.rt;
  }

  setUserData(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserData() {
    let d:any = localStorage.getItem('user');
    return JSON.parse(d);
  }

  setToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(user: any) {
    this.setUserData(user);
    if (this.getToken()) {
      this.router.navigate(['/dashboard']);
    }
    return true;
  }
}
