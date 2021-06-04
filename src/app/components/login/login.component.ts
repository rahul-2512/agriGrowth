import { ToastrService } from 'ngx-toastr';
import { HttpService } from './../../services/http.service';
import { GlobalService } from './../../services/global-service.service';
import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  active = 2;
  userLoginForm = {
    email: '',
    password: ''
  }
  adminLoginForm = {
    email: '',
    password: ''
  }
  constructor(private gs:GlobalService, private ht:HttpService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  loginIn(){
    console.log(this.userLoginForm);
    
    this.ht.getUser().subscribe((res:any)=> {
      res.forEach((user:any) => {
        if(user.email === this.userLoginForm.email && user.password === this.userLoginForm.password){
          console.log(user);
          
          this.gs.isAuthenticated(user);
        } else {
          this.toastr.error('Email or Password Might be incorrect')
        }
        
      });
      
    }, (error)=> {
      this.toastr.error('Something Went Wrong, Try Again Later');
    })
  }


}
