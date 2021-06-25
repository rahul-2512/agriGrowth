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
  isLogged = false;
  constructor(
    private gs: GlobalService,
    private ds: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  loginIn() {
    this.ds.login(JSON.stringify(this.userLoginForm)).subscribe(
      (userdata: any) => {
        if (userdata.accesstoken) {
          this.gs.setToken(userdata.accesstoken);
          this.gs.isAuthenticated(userdata.profile);
        } else {
          console.log('Not Authorize');
        }
      },
      (err: any) => {
        if (err.status) {
          this.toastr.warning(err.error.message);
        } else {
          this.toastr.error('Something Went Wrong!!');
        }
      }
    );
  }
}
