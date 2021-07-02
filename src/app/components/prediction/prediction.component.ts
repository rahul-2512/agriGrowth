import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/http.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/services/global-service.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false })
  fileDropEl!: ElementRef;
  files = [];
  userData;
  soildId;
  soilData = {
    soiltype: '',
    temp: '',
    humidity: '',
    ph: '',
    rainfall: '',
  };
  uploadType;
  constructor(
    private gs: GlobalService,
    private ds: DataService,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
    this.soildId = this.route.snapshot.params.id;
    this.uploadType = this.route.snapshot.params.type;
  }

  submit() {
    console.log(this.soilData);
  }

  upload(soilId, payload ,type) {
    this.ds
      .upload(`${environment.api}/soiltest/${type}/${soilId}`, payload)
      .subscribe((res) => {
        this.toastr.success('Uploaded Successfully!!');
        this.router.navigate(['/dashboard']);
      }, (err)=> {
        this.toastr.error('Something Went Wrong, Please Check the File.')
      });
  }

  onFileDropped($event, type) {
    this.prepareFilesList($event, type);
  }

  fileBrowseHandler(files, type) {
    this.prepareFilesList(files, type);
  }

  prepareFilesList(files, type) {
    let reader = new FileReader();
    if (files && files.length > 0) {
      let file = files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(file);
        this.prepareFormData(file, type);
      };
    }
    this.fileDropEl.nativeElement.value = '';
  }

  prepareFormData(file, type) {
    let formdata = new FormData();
    formdata.append(type, file);
    let uploadTYpe;
    type === 'report' ? uploadTYpe = 'uploadReport' : uploadTYpe = 'uploadPrediction'
    this.upload(this.soildId, formdata, uploadTYpe);
  }
}
