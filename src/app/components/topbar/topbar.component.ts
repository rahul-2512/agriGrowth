import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  ss:any;
  collapsed: any = true;
  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.ss = sessionStorage;
  }

  fullPageScroll(e:any) {

    this.pageScrollService.scroll({
      scrollTarget: document.querySelector(e),
      document: this.document,
    });
  }
}
