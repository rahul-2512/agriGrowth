import { GlobalService } from './../../services/global-service.service';
import { ModalService } from './../../services/modal-service.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  first_step = true;
  second_step = false;
  addMoreLand: any;
  landInfoArray: any = [];
  state_List: any;
  district_List: any;
  stateLoaded = true;
  states: any;
  districts: any;
  step1 = {
    name: '',
    email: '',
    password: '',
    cnfpassword: '',
    phoneNo: null,
  };

  step2 = {
    address: '',
    landmark: '',
    pincode: null,
    state: '',
    district: '',
    sizeOfLand: '',
    landSizeUnit: 'Acre',
    waterSource: '',
    infoAboutCrop: '',
    cropInfo: {}
  };

  step3 = {
    state: '',
    district: '',
    cropYear: null,
    season: '',
    crop: '',
    area: '',
    production: null,
  };
  constructor(
    private toastr: ToastrService,
    private modal: ModalService,
    private gs: GlobalService,
    private ds: DataService
  ) {}

  ngOnInit(): void {}

  moreLand(stepForm2: NgForm, stepForm3:NgForm) {
    // console.log(this.addMoreLand);
    if (this.addMoreLand) {
      this.modal
        .open('confirm', 'Do you Want to Add More Land Info?')
        .then(() => {
          this.landInfoArray.forEach((l: any) => {
            if (l.landmark === this.step2.landmark) {
              this.toastr.warning('Same Entry Exist for entered Land Mark');
              return;
            }
          });
          let landInfo = Object.assign({}, this.step2);
          let cropInfo = Object.assign({}, this.step3);
          landInfo['cropInfo'] = cropInfo;
          
          this.landInfoArray.push(landInfo);
          this.toastr.success(
            `SuccessFully Added Land for Land Mark ${this.step2.landmark}`
          );

          console.log('landInfoArray', this.landInfoArray);
          this.addMoreLand = false;
          stepForm2.reset();
          stepForm3.reset();
        })
        .catch(() => {
          this.addMoreLand = false;
        });
    } else {
    }
  }

  firstStep(stepForm1: NgForm) {
    if (stepForm1.invalid) {
      this.toastr.error('Please Fill All required Fields');
      return;
    }
    if (this.step1.password === this.step1.cnfpassword) {
      this.first_step = false;
      this.second_step = true;
      if (this.stateLoaded) {
        this.stateList();
        this.stateLoaded = false;
      }
    } else {
      this.toastr.error('Password Mismatched');
    }
  }

  prevStep() {
    this.first_step = true;
    this.second_step = false;
  }

  signUp() {
    let landInfo = Object.assign({}, this.step2);
    let cropInfo = Object.assign({}, this.step3);
    landInfo['cropInfo'] = cropInfo;
    this.landInfoArray.push(landInfo);
    
    let finalObj: any = Object.assign({}, this.step1);
    finalObj['landInfo'] = this.landInfoArray;
    console.log('payLoad ',finalObj);
    this.ds
      .basicPost(`${environment.api}/auth/register`, JSON.stringify(finalObj))
      .subscribe((res: any) => {
        if (res) {
          console.log(res);

          this.toastr.success('User Registered Successfully, Logged Now!');
          this.ds
            .login(
              JSON.stringify({
                email: finalObj.email,
                password: finalObj.password,
              })
            )
            .subscribe((userdata: any) => {
              this.gs.setToken(userdata.accesstoken);
              this.gs.isAuthenticated(userdata.profile);
            });
        }
      });
  }

  stateList() {
    this.ds.getStateList((res) => {
      this.state_List = res;
    });
  }

  selectD() {
    this.step2.district = this.districts.district_name;
    this.step3.district = this.districts.district_name;
  }

  districtList() {
    this.step2.state = this.states.state_name;
    this.step3.state = this.states.state_name;

    if (this.states.state_id) {
      this.ds.getDistrictList(this.states.state_id, (res) => {
        this.district_List = res;
      });
    }
  }
}
