import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { ProductService } from 'app/mre/product/product.service';
import { PurchaseService } from '../purchase.service';
@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.scss']
})
export class EditPurchaseComponent implements OnInit {
  @Output() purchaseEditEventEmitter = new EventEmitter<Object>();
  @Input() data;



  products = [];
  product;
  stock;
  stockValue;
  selectedProductId;

  stock_id;
  stockName;
  selectedStockId;
  cerror = false;

  newForm: FormGroup;
  stocks = [
    { "id": 1, "name": "Main stock" },
    { "id": 2, "name": "Sub stock" },
  ];
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private purchaseService: PurchaseService,
    private spinner: NgxSpinnerService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.selectedProductId = this.data.product_id;
    this.selectedStockId = this.data.stock_id;
    this.newForm = this.formBuilder.group({
      price: [this.data.price, [Validators.required]],
      qty: [this.data.qty, [Validators.required]],
      product_id: [this.data.product_id, [Validators.required]],
      stock_id: [this.data.stock_id, [Validators.required]],
    });
    
    this.getProductList();

  }


  getProductList() {
    this.productService.productList().subscribe((res: any) => { 
      this.products = res;
    })
  }

  onFormSubmit() {
 
    const { price, qty, product_id, stock_id } = this.newForm.value;
    this.spinner.show();
    this.purchaseService.update(this.data.id, { price, qty, product_id, stock_id }).subscribe(res => {
      if (res) {
        this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
        this.purchaseEditEventEmitter.emit(res);
        this.closeModal();
      }

      else
        this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");

      this.spinner.hide();

    }, error => {
      this.spinner.hide();
      this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
    });
    
  }




  closeModal() {
    this.activeModal.close()
  }

}
