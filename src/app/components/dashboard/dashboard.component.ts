import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/http.service';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  forAdmin: any;
  soilTestingEarlier = 'no';
  showTesting = 'no';
  userData: any;
  adminMyTestingRequests: any;
  soilData = {
    soiltype: '',
    temp: '',
    humidity: '',
    ph: '',
    rainfall: '',
  };
  myTestingRequests: any;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private gs: GlobalService,
    private ds: DataService,
    private toastr:ToastrService
  ) {}
  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
    if (this.userData.role === 'admin') {
      this.forAdmin = true;
      this.getAdminTestingReq();
    } else {
      this.forAdmin = false;
      this.getTestingReq();
    }
  }

  getAdminTestingReq() {
    this.ds
      .get(`${environment.api}/soiltest/allTests`)
      .subscribe((res: any) => {
        this.adminMyTestingRequests = res;
      });
  }

  getTestingReq() {
    this.ds.get(`${environment.api}/soiltest/myTests`).subscribe((res: any) => {
      console.log(res);
      
      this.myTestingRequests = res;
    });
  }

  requestType = [
    { id: 1, name: 'For Own Land' },
    { id: 2, name: 'For Someone else Land' },
  ];

  changeSoilTesting(d: string) {
    this.showTesting = d;
  }

  reqForSoil(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  getPrediction(){
    this.ds.post(`${environment.api}/soiltest/cropInfo`, JSON.stringify(this.soilData)).subscribe((res:any)=> {
      console.log(res);
      
    })
  }

  submit(form:NgForm) {
    if(form.invalid){
      this.toastr.warning('Invalid Form Input')
      return 
    }
    this.getPrediction();
  }
  requestForLand(id: any) {
    this.gs.setRequestType(id);
    this.router.navigate(['/requestForm']);
  }
}
