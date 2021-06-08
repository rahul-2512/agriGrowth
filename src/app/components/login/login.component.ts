import { ToastrService } from 'ngx-toastr';
import { HttpService } from './../../services/http.service';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm = {
    email: '',
    password: '',
  };
  constructor(
    private gs: GlobalService,
    private ht: HttpService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  loginIn() {
    this.ht.getUser().subscribe(
      (users: any) => {
        for (let index = 0; index < users.length; index++) {
          if (
            users[index] &&
            users[index].email === this.userLoginForm.email &&
            users[index].password === this.userLoginForm.password
          ) {
            this.gs.isAuthenticated(users[index]);
            return;
          }
          if (
            !users[index] &&
            users[index].email !== this.userLoginForm.email &&
            users[index].password !== this.userLoginForm.password
          ) {
            this.toastr.error('Email or Password Might be incorrect');
          }
        }
      },
      (error) => {
        this.toastr.error('Something Went Wrong, Try Again Later');
      }
    );
  }
}
