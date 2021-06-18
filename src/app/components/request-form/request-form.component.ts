import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

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
  landmarkInfo: any;
  requestFormObj = {
    requestor: '',
    email: '',
    phoneNo: null,
    requestedFor: 'Other',
    landInfo: {
      address: '',
      landmark: '',
      pincode: null,
      state: '',
      district: '',
      sizeOfLand: '',
      landSizeUnit: 'Acre',
      waterSource: '',
      infoAboutCrop: '',
    },
  };
  userInfo: any;
  landInfoArray: any;
  landmarkArray: any;
  selfRequestForm = {
    requestor: '',
    email: '',
    phoneNo: null,
    landInfo: {},
  };
  constructor(
    private gs: GlobalService,
    private toastr: ToastrService,
    private router: Router,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.landmarkArray = [];
    this.myLand = this.gs.getRequestType();
    if (this.myLand === 1) {
      this.userInfo = this.gs.getUserData();
      this.selfRequestForm['requestor'] = this.userInfo.name;
      this.selfRequestForm['email'] = this.userInfo.email;
      this.selfRequestForm['phoneNo'] = this.userInfo.phoneNo;

      this.getLandMarkDetails();
    }
    if (!this.myLand) {
      this.backToDashboard();
    }
    this.stateList();
  }

  getLandMarkDetails() {
    this.landInfoArray = [];
    this.userInfo.landInfo.forEach((land: any) => {
      this.landInfoArray.push(land);
      land['isChecked'] = false;
    });
    console.log(this.landInfoArray);
  }

  backToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  submitForOwn(form: NgForm) {
    if (!form.invalid) {
      this.requestForSoilTesting(this.landmarkArray);
    }
  }

  chooseLandMark(e: any, land: any) {
    if (e.target.checked) {
      this.selfRequestForm.landInfo = land;
      this.landmarkArray.push(this.selfRequestForm);
    } else {
      this.landmarkArray = this.landmarkArray.filter((el: any) => {
        return el !== land;
      });
    }
  }

  submitRequest(form: NgForm) {
    if (!form.invalid) {
      console.log(this.requestFormObj);
      this.requestForSoilTesting([this.requestFormObj]);
    } else {
      this.toastr.warning('Please Fill All the Fields!');
    }
  }

  requestForSoilTesting(data: any) {
    this.ds
      .post(
        `${environment.api}/soiltest/newTest`,
        JSON.stringify({ data: data })
      )
      .subscribe((res: any) => {
        console.log(res);

        this.toastr.success('Request Submmited Successfully');
        this.backToDashboard();
      });
  }

  stateList() {
    this.ds.getStateList().subscribe(
      (stateList: any) => {
        this.state_List = stateList.states;
      },
      () => {
        this.toastr.error('Error While Fetching the States!!');
      }
    );
  }

  selectD() {
    this.requestFormObj.landInfo.district = this.districts.district_name;
  }

  districtList() {
    this.requestFormObj.landInfo.state = this.states.state_name;

    if (this.states.state_id) {
      this.ds.getDistrictList(this.states.state_id).subscribe(
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
