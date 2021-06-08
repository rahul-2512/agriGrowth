import { GlobalService } from './../../services/global-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  forAdmin:any;
  soilTestingEarlier = 'no';
  showTesting = 'no';
  userData: any;
  soilData = {
    soiltype: '',
    temp: '',
    humidity: '',
    ph: '',
    rainfall: '',
  }
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private gs: GlobalService
  ) {}
  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
    this.forAdmin = this.userData.isAdmin;
    // console.log(this.userData);    
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

  submit(){
    console.log(this.soilData);
    
  }
  requestForLand(id: any) {
    console.log(id);
    this.gs.setRequestType(id);
    this.router.navigate(['/requestForm']);
  }
}
