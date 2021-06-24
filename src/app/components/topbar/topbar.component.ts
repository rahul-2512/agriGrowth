import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { GlobalService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  collapsed: any = true;
  ssuser: any;
  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    private gs: GlobalService
  ) {}

  ngOnInit(): void {
    this.ssuser = this.gs.getUserData();    
  }

  fullPageScroll(e: any) {
    this.pageScrollService.scroll({
      scrollTarget: document.querySelector(e),
      document: this.document,
    });
  }

  logout(){
    localStorage.clear();
  }
}
