import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  myLand: any;
  state_List: any;
  district_List: any;
  stateLoaded = true;
  states: any;
  districts: any;
  requestFormObj = {
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
    phoneNo: null,
    address: '',
    landmark: '',
    pincode: null,
    state: '',
    district: '',
    sizeofland: '',
    landSizeUnit: 'Acre',
    waterSource: '',
    infoAboutCrop: '',
  };
  constructor(
    private gs: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    private ht: HttpService
  ) {}

  ngOnInit() {
    this.myLand = this.gs.getRequestType();
    if (!this.myLand) {
      this.backToDashboard();
    }
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  submitRequest(form:NgForm) {
    if(!form.invalid){
      console.log(this.requestFormObj);
    
    this.toastr.success('Request Submmited Successfully');
    this.backToDashboard();
    } else {
      this.toastr.warning('Please Fill All the Fields!')
    }
    
  }

  stateList() {
    this.ht.getStateList().subscribe(
      (stateList: any) => {
        this.state_List = stateList.states;
      },
      () => {
        this.toastr.error('Error While Fetching the States!!');
      }
    );
  }

  selectD() {
    this.requestFormObj.district = this.districts.district_name;
  }

  districtList() {
    this.requestFormObj.state = this.states.state_name;

    if (this.states.state_id) {
      this.ht.getDistrictList(this.states.state_id).subscribe(
        (districtList: any) => {
          this.district_List = districtList.districts;
        },
        () => {
          this.toastr.error('Error While Fetching the District!!');
        }
      );
    }
  }
}
