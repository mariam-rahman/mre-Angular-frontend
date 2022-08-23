import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebpageService } from '../webpage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  constructor(
    private webpageService:WebpageService,
    private spinner: NgxSpinnerService,
  ) { }
  homeinfo
  categories 
  products
  categoryFilters

  ngAfterViewInit(){
    this.category();

  }


  category() {
    this.spinner.show();
    this.webpageService.categorylist().subscribe(data => {
      this.categories = data;
      this.spinner.hide()
    })
  }

  categoryFilter(id){
    this.spinner.show();
    this.webpageService.categoryfiltters(id).subscribe(data => {
      this.products = data;
      console.log('categoryFilters',data);
      this.spinner.hide()
    })
  }

  filter(id){
    // this.spinner.show()
    // this.webpageService.filter(id).subscribe(data => {
    //   this.products = data;
    //   console.log('products',data);
    //   this.spinner.hide()
    // })
  }

}
