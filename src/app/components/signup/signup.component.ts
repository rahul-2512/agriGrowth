import { GlobalService } from './../../services/global-service.service';
import { ModalService } from './../../services/modal-service.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
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
  districts:any;
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
    sizeofland: '',
    landSizeUnit: 'Acre',
    waterSource: '',
    infoAboutCrop: '',
  };
  constructor(
    private toastr: ToastrService,
    private modal: ModalService,
    private gs: GlobalService,
    private ht: HttpService
  ) {}

  ngOnInit(): void {}

  moreLand(stepForm2:NgForm) {
    // console.log(this.addMoreLand);
    if (this.addMoreLand) {
      this.modal
        .open('confirm', 'Do you Want to Add More Land?')
        .then(() => {
          this.landInfoArray.forEach((l: any) => {
            if (l.landmark === this.step2.landmark) {
              this.toastr.warning('Same Land Mark Exist');
              return;
            }
          });
          let landInfo = Object.assign({}, this.step2);
          this.landInfoArray.push(landInfo);
          this.toastr.success(
            `SuccessFully Added Land for Land Mark ${this.step2.landmark}`
          );

          console.log('landInfoArray', this.landInfoArray);
          this.addMoreLand = false;
          stepForm2.reset();
        })
        .catch(() => {
          this.addMoreLand = false;
        });
    } else {
    }
  }

  firstStep(stepForm1:NgForm) {
    if(stepForm1.invalid){
      this.toastr.error('Please Fill All required Fields');
      return
    }
    if (this.step1.password === this.step1.cnfpassword) {
      this.first_step = false;
      this.second_step = true;
      if(this.stateLoaded){
        this.stateList();
        this.stateLoaded = false;
      }
    } else {
      this.toastr.error('Password Mismached');
    }
  }

  prevStep() {
    this.first_step = true;
    this.second_step = false;
  }

  signUp() {
    let landInfo = Object.assign({}, this.step2);
    this.landInfoArray.push(landInfo);

    let finalObj: any = Object.assign({}, this.step1);
    finalObj['landInfo'] = this.landInfoArray;
    console.log(finalObj);
    this.ht.signupUser(JSON.stringify(finalObj));
    this.gs.loginNow();
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

  selectD(){
    this.step2.district = this.districts.district_name;
  }

  // DoLogin(){
  //   const salt = bcrypt.genSaltSync(10);
  //   let pass = bcrypt.hashSync('Pass@123', 10);
  //   console.log(pass);    
  // }

  districtList() {
    this.step2.state = this.states.state_name;

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
