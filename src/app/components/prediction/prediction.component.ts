import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global-service.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit {
  userData: any;
  soilData = {
    soiltype: '',
    temp: '',
    humidity: '',
    ph: '',
    rainfall: '',
  }
  constructor(private gs: GlobalService) {}

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
  }

  submit(){
    console.log(this.soilData);
    
  }
}
