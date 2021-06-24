import { GlobalService } from 'src/app/services/global-service.service';
import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { FileSaverService } from 'ngx-filesaver';
let headers = new HttpHeaders();
@Injectable({
  providedIn: 'root',
})
export class DataService {
  authToken: any;
  state_list: any;
  district_List: any;
  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private gs: GlobalService
  ) {
    this.authToken = this.gs.getToken();
    if (this.authToken) {
      headers = headers.set('x-auth-token', this.authToken);
    }
  }

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

  get(url: string, download?) {
    if (download) {
      headers.set('Content-Type', 'multipart/form-data');
      headers.set('Accept', '*/*');
    }
    return this.http.get(url, {
      headers: new HttpHeaders().set('x-auth-token', this.authToken),
    });
  }
  downloadReport(url: string, download?) {
    if (download) {
      headers.set('Content-Type', 'multipart/form-data');
      headers.set('Accept', '*/*');
    }
    return this.http.get(url, {
      headers: headers,
      responseType: 'text',
    });
  }

  post(url: string, payload: string) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders()
        .set('x-auth-token', this.authToken)
        .set('Content-Type', 'application/json'),
    });
  }
  upload(url: string, payload: string) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders().set('x-auth-token', this.authToken),
    });
  }
}
