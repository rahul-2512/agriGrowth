import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/http.service';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('getPredictionModal') getPredictionModal;
  forAdmin: any;
  soilTestingEarlier = 'no';
  showTesting = 'no';
  userData: any;
  adminMyTestingRequests: any;
  landInfoArray: any;
  soilData = {
    soilInfo: {
      soiltype: '',
      temp: '',
      humidity: '',
      ph: '',
      rainfall: '',
    },
    soiltestId: null,
  };
  myTestingRequests: any;
  districts: any;
  states: any;
  district_List: any;
  state_List: any;
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
        } else {
          this.toastr.error('Error while Fetching the Data!');
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
        } else {
          this.toastr.error('Error while Fetching the Data!');
        }
      }
    );
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

  getPrediction() {
    this.ds
      .post(
        `${environment.api}/soiltest/soilInfo`,
        JSON.stringify(this.soilData)
      )
      .subscribe(
        (res: any) => {
          console.log(res);
          res.report = null;
          this.modalService.dismissAll();
        },
        (err) => {
          if (err.status == 401) {
            console.log(err);
          } else {
            this.toastr.error('Error while Fetching the Data!');
          }
        }
      );
  }

  submit(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Invalid Form Input');
      return;
    }
    console.log(this.soilData);
    
    this.getPrediction();
  }
  requestForLand(id: any) {
    this.gs.setRequestType(id);
    this.router.navigate(['/requestForm']);
  }

  chooseLandMark(e, land) {
    console.log(land);
    
    e.target.checked
      ? (this.soilData.soiltestId = land._id)
      : (this.soilData.soiltestId = null);
  }

  deleteRequest(id, isAdmin?) {
    this.ds
      .deleteRequest(`${environment.api}/soiltest/myTests/${id}`)
      .subscribe(
        (res) => {
          this.toastr.info('Deleted Request successfully');
          isAdmin ? this.getAdminTestingReq() : this.getTestingReq();
        },
        (err) => {
          this.toastr.error('Error while Fetching the Data!');
        }
      );
  }

  download(soilId: any, issoilInfo, type, filename) {
    this.ds
      .download(`${environment.api}/soiltest/${type}/${soilId}`)
      .subscribe(
        (res) => {
          // console.log('download', res);
          let fileName = `${filename}- ${soilId}`;
          let contentType = 'application/pdf';
          let b64Data = res;
          let blob = this.b64toBlob(b64Data, contentType);
          let file = new Blob([blob], { type: contentType });
          this.fileSaver.save(file, fileName);
          if(!issoilInfo){
            this.predicationPopupOnDownload(this.getPredictionModal, soilId);
          }
        },
        (err) => {
          if (err.status == 401) {
            console.log(err);
          } else {
            this.toastr.error('Error while Downloading the Report!');
          }
        }
      );
  }

  predicationPopupOnDownload(content, soilId){
    this.soilData.soiltestId = soilId
    this.modalService.open(content, {size: 'lg'});
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

  upload(request, type) {
    if (!!request._id) {
      this.router.navigate(['/upload', {id: request._id, type: type}]);
    }
  }
}
