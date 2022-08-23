import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { PurchaseService } from '../purchase.service';
import { ProductService } from 'app/mre/product/product.service';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.scss']
})
export class CreatePurchaseComponent implements OnInit {
  @Output() createPurchaseEventEmitter = new EventEmitter<Object>();

  newForm: FormGroup;
  products = [];
  product;
  stock;
  selectedProductId;
  stockValue;
  cerror = false;


  constructor(
    private formBuilder: FormBuilder, 
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toaster: TranslatedToastrService,
    private purchaseService: PurchaseService,
    private productService: ProductService,
  ) { }


  ngOnInit(): void {
    this.newForm = this.formBuilder.group({ 
      price: [null, Validators.required],
      qty: [null, Validators.required],
      product_id: [null, [Validators.required]],
    });
    this.getProductList();
  }

  closeModal() {
    this.activeModal.close();    
  }

  onFormSubmit() { 
    if (this.newForm.valid) {  
      if(!this.stockValue){
        this.cerror = true;
        return;
      }
      this.spinner.show();
      const { qty, price, product_id } = this.newForm.value;
      this.purchaseService.add({ qty, price,product_id ,stock_id: this.stockValue }).subscribe((res:any) => {
        console.log(res);
        
        if (res.response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.createPurchaseEventEmitter.emit(res);
          this.spinner.hide();
          this.closeModal();
        } else {
          this.spinner.hide();
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        }
      },error=>{
        console.log(error);
        
        this.spinner.hide();
        this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
      });
    }
    else
    {
      if(!this.stockValue){
        this.cerror = true;
        
      }
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true }); 
      });
    }
  }

  getProductList() {
    this.productService.productList().subscribe((res: any) => {
      this.products = res;
    })
  }  

  setStock(val) {
    this.stockValue = val;
  }




}
