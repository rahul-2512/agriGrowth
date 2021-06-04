import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getUser() {
    return this.http.get(`${environment.api}/users`);
  }

  signupUser(payload: any) {
    return this.http
      .post(`${environment.api}/users`, payload, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .subscribe((res: any) => {
        this.toastr.success('Signup User Successfully');
      });
  }

  getStateList() {
    return this.http.get(`${environment.cowin_api}/admin/location/states`);
  }

  getDistrictList(stateId: any) {
    return this.http.get(
      `${environment.cowin_api}/admin/location/districts/${stateId}`
    );
  }
}
