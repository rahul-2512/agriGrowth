import { GlobalService } from 'src/app/services/global-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  images = [1, 2, 3, 4, 5].map((n) => `assets/images/slider/slider-${n}.png`);
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  isLoginEnable = true;
  isSignUp = false;
  ssuser: any;
  whyChooseUs = [
    {
      step: 1,
      heading: 'Register Yourself',
      description: 'Fill the signup Form with Details about your Land(s)',
    },
    {
      step: 2,
      heading: 'Request Soil Testing',
      description:
        'Login to Portal and Request for soil testing for Own and also someone else land',
    },
    {
      step: 3,
      heading: 'Download Testing Report',
      description:
        'Under My Request, download generated report of soil testing for your Land',
    },
    {
      step: 4,
      heading: 'Get Prediction Report',
      description: 'Fill Soil Testing Form and get the Best Prediction Report',
    },
  ];

  teamInfo = [
    {
      name: 'Rahul Sethia',
      course: 'Btech(CSE)',
      email: 'rahulsethia085@gmail.com',
      phone: 9765645541,
    },
    {
      name: 'Krishna Baheti',
      course: 'Btech(CSE)',
      email: 'krishnabaheti95@gmail.com',
      phone: 6003349452,
    },
    {
      name: 'Sharvari Jadhav',
      course: 'Btech(CSE)',
      email: 'sharvarijadhav2727@gmail.com',
      phone: 7083682727,
    },
    {
      name: 'Manali Jadhav',
      course: 'Btech(CSE)',
      email: 'manalijadhav1611@gmail.com',
      phone: 9011944862,
    },
  ];
  constructor(private gs: GlobalService) {}

  ngOnInit(): void {
    this.ssuser = this.gs.getUserData();
  }
}
