import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebpageService } from '../webpage.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  homeinfo
  constructor(
    private webpageService: WebpageService,
    config: NgbCarouselConfig,
    private spinner: NgxSpinnerService,
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

  goProductPage(){  
    this.router.navigate(['../productpage'], { relativeTo: this.route });
  }

  goHomePage(){
    this.router.navigate(['../homepage'], { relativeTo: this.route });
  }

  goAboutPage(){
    this.router.navigate(['../about'], { relativeTo: this.route });
  }

}
