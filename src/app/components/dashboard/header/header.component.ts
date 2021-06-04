import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userData:any;
  collapsed: any = true;
  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    sessionStorage.clear();
  }

}
