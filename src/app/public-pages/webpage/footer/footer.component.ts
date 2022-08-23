import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from 'app/mre/website/banner/banner.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebpageService } from '../webpage.service';

@Component({
  selector: 'web-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  homeinfo
  constructor(
    private webpageService: WebpageService,
    config: NgbCarouselConfig,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.homeinfos();
  }

  homeinfos() {
    //this.spinner.show();
    this.webpageService.homeInfoList().subscribe(data => {
      this.homeinfo = data;
      console.log('home info data', this.homeinfo);
      //this.spinner.hide();
    })
  }

}
