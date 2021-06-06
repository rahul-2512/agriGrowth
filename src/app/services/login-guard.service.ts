import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './global-service.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(public gs: GlobalService, public router: Router, private toastr:ToastrService) {}
  canActivate(): boolean {
    if (!this.gs.isAuthorize()) {
      this.toastr.warning('Please Login to Access the Content','Warning', {
        timeOut: 2000
      });
      this.router.navigate(['home']);      
      return false;
    }
    return true;
  }
}
