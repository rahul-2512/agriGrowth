import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [1,2,3,4,5].map((n) => `assets/images/slider/slider-${n}.png`);
  isLoginEnable = true;
  isSignUp = false;
  ssuser: any;
  constructor() { }

  ngOnInit(): void {
    this.ssuser = sessionStorage.user;
  }


}
