import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  authToken: any;
  state_list: any;
  district_List: any;
  constructor(private toastr: ToastrService, private http: HttpClient) {}

  getStateList(callback) {
    return this.http
      .get(`${environment.cowin_api}/admin/location/states`)
      .subscribe(
        (statesList: any) => {
          this.state_list = statesList.states;
          callback(this.state_list);
        },
        () => {
          this.toastr.error('Error While Fetching the States!!');
        }
      );
  }

  getDistrictList(stateId: any, callback) {
    return this.http
      .get(`${environment.cowin_api}/admin/location/districts/${stateId}`)
      .subscribe(
        (districtList: any) => {
          this.district_List = districtList.districts;
          callback(this.district_List);
        },
        () => {
          this.toastr.error('Error While Fetching the District!!');
        }
      );
  }

  basicGet(url: string) {
    return this.http.get(url);
  }

  login(payload: string) {
    return this.http.post(`${environment.api}/auth/login`, payload, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  basicPost(url: string, payload: string) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  get(url: string) {
    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'x-auth-token',
        localStorage.getItem('token')
      ),
    });
  }
  downloadReport(url: string) {
    return this.http.get(url, {
      headers: new HttpHeaders()
        .set('Content-Type', 'multipart/form-data')
        .set('Accept', '*/*')
        .set('x-auth-token', localStorage.getItem('token')),
      responseType: 'text',
    });
  }

  post(url: string, payload) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders()
        .set('x-auth-token', localStorage.getItem('token'))
        .set('Content-Type', 'application/json'),
    });
  }
  upload(url: string, payload: string) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders().set(
        'x-auth-token',
        localStorage.getItem('token')
      ),
    });
  }

  deleteRequest(url: string) {
    return this.http.delete(url, {
      headers: new HttpHeaders().set(
        'x-auth-token',
        localStorage.getItem('token')
      ),
    });
  }
}
