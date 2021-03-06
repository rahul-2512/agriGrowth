import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global-service.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userData: any;
  collapsed: any = true;
  constructor(private gs: GlobalService) {}

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
  }

  logout() {
    localStorage.clear();
  }
}
