import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebpageService } from '../webpage.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from 'app/mre/website/banner/banner.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [NgbCarouselConfig] // add NgbCarouselConfig to the component providers
})
export class HomepageComponent implements OnInit {


  constructor(
    private webpageService: WebpageService,
    config: NgbCarouselConfig,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  silderTitles;
  sliders;
  webcategory
  categories;
  products;
  homeinfo
  banners;
  isBanner = false;

  ngOnInit(): void {
    this.getBanners();
    this.categoryImage();
    this.product();
    this.homeinfos();
   
   

    this.webpageService.listSliderTitles().subscribe(data => {
      this.silderTitles = data;
      console.log("Slider titles", data);
    })


  }

  reload() {

    this.webpageService.bannerList().subscribe(data => {

      this.sliders = data

    })
  }

  homeinfos() {
    //this.spinner.show();
    this.webpageService.homeInfoList().subscribe(data => {
      this.homeinfo = data;
      console.log('home info data', this.homeinfo);
      //this.spinner.hide();
    })
  }
  categoryImage() {
    this.spinner.show()
    this.webpageService.categorylist().subscribe(data => {
      this.categories = data;
      this.spinner.hide()
    })
  }

  product() {
    this.spinner.show();
    this.webpageService.productlist().subscribe(data => {
      this.products = data;
      this.spinner.hide();
    })
  } 

 

  getBanners() {
    this.spinner.show()
    this.bannerService.list().subscribe(data => {
      if (data != null)
        this.banners = data;
      this.spinner.hide()
      console.log("banners:", this.banners);

    })
  }

  detail(id)
  {
    console.log("id:",id);
    

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
