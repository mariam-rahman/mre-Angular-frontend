import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebpageService } from '../webpage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

 
  constructor(
    private webpageService:WebpageService,
    private spinner: NgxSpinnerService,
  ) { }
  homeinfo
  
  ngOnInit(): void {
    this.homeinfos();
  
  }

  homeinfos() {
    //this.spinner.show();
    this.webpageService.homeInfoList().subscribe(data => {
      console.log('homeinfo',data);
      this.homeinfo = data;
      //this.spinner.hide();
    })
  }

}
