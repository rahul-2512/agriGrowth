import { GlobalService } from 'src/app/services/global-service.service';
import { environment } from './../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  authToken: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private gs: GlobalService
  ) {
    this.authToken = this.gs?.getToken();
  }

  getStateList() {
    return this.http.get(`${environment.cowin_api}/admin/location/states`);
  }

  getDistrictList(stateId: any) {
    return this.http.get(
      `${environment.cowin_api}/admin/location/districts/${stateId}`
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

  get(url: string): Observable<any> {
    return this.http
      .get(url, {
        headers: new HttpHeaders().set('x-auth-token', this.authToken),
      });
  }

  post(url: string, payload: string) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders()
        .set('x-auth-token', this.authToken)
        .set('Content-Type', 'application/json'),
    });
  }
}
