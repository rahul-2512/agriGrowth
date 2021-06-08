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
  whyChooseUs= [
    {
      step: 1,
      heading: 'Register Yourself',
      description: 'Fill the signup Form with Details about your Land(s)'
    },
    {
      step: 2,
      heading: 'Request Soil Testing',
      description: 'Login to Portal and Request for soil testing for Own and also someone else land'
    },
    {
      step: 3,
      heading: 'Download Testing Report',
      description: 'Under My Request, download generated report of soil testing for your Land'
    },
    {
      step: 4,
      heading: 'Get Predication Report',
      description: 'Fill Soil Testing Form and get the Best Predication Report'
    },
  ]
  constructor() { }

  ngOnInit(): void {
    this.ssuser = sessionStorage.user;
  }




}
