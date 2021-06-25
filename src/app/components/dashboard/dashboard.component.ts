import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/http.service';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { FileSaverService } from 'ngx-filesaver';

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
    cropInfo: {
      soiltype: '',
      temp: '',
      humidity: '',
      ph: '',
      rainfall: '',
    },
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
  myTestingRequests: any;
  districts: any;
  states: any;
  district_List:any;
  state_List:any;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private gs: GlobalService,
    private ds: DataService,
    private toastr: ToastrService,
    private fileSaver: FileSaverService
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
      console.log('call');
      
      this.forAdmin = false;
      this.getTestingReq();
    }
  }

  getAdminTestingReq() {
    this.ds.get(`${environment.api}/soiltest/allTests`).subscribe(
      (res: any) => {
        this.adminMyTestingRequests = res;
      },
      (err) => {
        if (err.status == 401) {
          this.toastr.error('You are Unauthorized to See this content!');
          this.router.navigate(['/home']);
        }
      }
    );
  }

  getTestingReq() {
    this.ds.get(`${environment.api}/soiltest/myTests`).subscribe(
      (res: any) => {
        this.myTestingRequests = res;
      },
      (err) => {
        if (err.status == 401) {
          console.log(err);
        }
      }
    )
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
    this.stateList();
  }

  getPrediction() {
    this.ds
      .post(
        `${environment.api}/soiltest/cropInfo`,
        JSON.stringify(this.soilData)
      )
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err) => {
          if (err.status == 401) {
            console.log(err);
          }
        }
      );
  }

  stateList() {
    this.ds.getStateList((res)=> {
      this.state_List = res;
    })
  }

  selectD() {
    this.soilData.landInfo.district = this.districts.district_name;
  }

  districtList() {
    this.soilData.landInfo.state = this.states.state_name;
    
    if (this.states.state_id) {
      this.ds.getDistrictList(this.states.state_id, (res)=> {
        this.district_List = res;
      })
    }
  }

  submit(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Invalid Form Input');
      return;
    }
    this.getPrediction();
  }
  requestForLand(id: any) {
    this.gs.setRequestType(id);
    this.router.navigate(['/requestForm']);
  }

  deleteRequest(id){
    this.ds.deleteRequest(`${environment.api}/soiltest/myTests/${id}`).subscribe((res)=> {
      this.toastr.info('Deleted Request successfully');
      this.getTestingReq();
    })
  }

  downloadReport(soilId: any) {
    this.ds
      .downloadReport(
        `${environment.api}/soiltest/downloadReport/${soilId}`
      )
      .subscribe(
        (res) => {
          // console.log('download', res);
          let fileName = `My Report- ${soilId}`;
          let contentType = 'application/pdf';
          let b64Data = res;
          let blob = this.b64toBlob(b64Data, contentType);
          let file = new Blob([blob], { type: contentType });
          this.fileSaver.save(file, fileName);
        },
        (err) => {
          if (err.status == 401) {
            console.log(err);
          }
        }
      );
  }

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  uploadReportNow(request) {
    if (request._id) {
      this.router.navigate(['/upload', request._id]);
    }
  }
}
