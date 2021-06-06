import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  rt: any;
  userInfo: any;
  constructor(private router:Router) {}

  setRequestType(id: any) {
    this.rt = id;
  }
  getRequestType() {
    return this.rt;
  }

  loginNow(){
    this.router.navigate(['/home']);
  }

  isAuthorize(){
    if(sessionStorage.user){
      return true;
    }else{
      return false;
    }
  }

  getUserData(){
    this.userInfo = JSON.parse(sessionStorage.user);
    this.isAuthorize();
    return this.userInfo;
  }

  isAuthenticated(user:any){ 
   sessionStorage.setItem('user',JSON.stringify(user));
    this.router.navigate(['/dashboard']);
    return true;
  }
}
