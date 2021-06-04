import { GlobalService } from '../../services/global-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  collapsed =true;
  userData: any;
  constructor(private gs:GlobalService) { }

  ngOnInit(): void {
    this.userData = this.gs.getUserData();
  }

}
