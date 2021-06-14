import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/http.service';
import { GlobalService } from 'src/app/services/global-service.service';
import { environment } from 'src/environments/environment';

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
    private ds: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  loginIn(form: NgForm) {
    this.ds.basicPost(`${environment.api}/auth/login`, JSON.stringify(this.userLoginForm)).subscribe(
      (userdata: any) => {
        this.gs.setToken(userdata.accesstoken);
        this.gs.isAuthenticated(userdata.profile);
      }, 
      (err: any) => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
