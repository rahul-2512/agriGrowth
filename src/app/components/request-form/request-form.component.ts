import { Router } from '@angular/router';
import { GlobalService } from './../../services/global-service.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  myLand: any;
  constructor(private gs: GlobalService, private toastr:ToastrService, private router:Router) {}

  ngOnInit(){
    this.myLand = this.gs.getRequestType();
  }

  submitRequest(){
    this.toastr.success('Request Submmited Successfully');
    this.router.navigate(['/dashboard']);
  }
}
