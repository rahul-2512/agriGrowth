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
  
  soilTestingEarlier = false;
  showTesting = false;
  userData: any;
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
    console.log(this.userData);
    
  }

  requestType = [
    { id: 1, name: 'For Own Land' },
    { id: 2, name: 'For Someone else Land' },
  ];

  changeSoilTesting(d: any) {
    this.showTesting = d;
    console.log(this.showTesting);
  }

  reqForSoil(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  requestForLand(id: any) {
    console.log(id);
    this.gs.setRequestType(id);
    this.router.navigate(['/requestForm']);
  }
}
