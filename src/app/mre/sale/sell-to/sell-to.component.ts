import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { SaleService } from '../sale.service';
import { Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { forEach } from 'core-js/core/array';
import { DeleteSellProductComponent } from '../delete-sell-product/delete-sell-product.component';
import { EditSellProductComponent } from '../edit-sell-product/edit-sell-product.component';
import { helpers } from 'chart.js';

@Component({
  selector: 'app-sell-to',
  templateUrl: './sell-to.component.html',
  styleUrls: ['./sell-to.component.scss']
})
export class SellTOComponent implements OnInit {

  @Output() saleToeventEmitter = new EventEmitter<Object>();
  @Output() sellProductEventEmitter = new EventEmitter<object>();
  @ViewChild(DatatableComponent) table: DatatableComponent;

  
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  SortType = SortType;
  rows;
  tempRows = [];
  data;
  loading;
  id;

  newForm: FormGroup;
  customers = [];
  customer;
  customerId;
  stock;
  selectedProductId;
  stockValue;
  cerror = false;
  

  pForm: FormGroup;

  showCustomerForm = true;
  showSellProductForm = false;
  showSellProductList = false;
  showPaymentForm = false;
  productId;
  products;
  sale_id;
  sell_price;
  qty;
  total_sell_price: number = 0;
  debt;
  
  customerForm;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toaster: TranslatedToastrService,
    private saleService: SaleService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private service: SaleService,
    private modalService: NgbModal,
  ) { }


  ngOnInit(): void {

    this.getcustomerList();
    this.buildForm();
    this.buildPForm(); 
    this.buildCutomerForm(); 
  

  }

  closeModal() {
    this.activeModal.close();
  }



  buildForm() {
    this.newForm = this.formBuilder.group({
      sell_price: [null, [Validators.required]],
      qty: [null, [Validators.required]],
      product_id:[null,Validators.required]
    });

  }

  buildPForm() {
    this.pForm = this.formBuilder.group({
      payment: [null, [Validators.required]],
    });
  }

 
  buildCutomerForm() {
    this.customerForm = this.formBuilder.group({
    
    });
  }

  onFormSubmit() {
    if (!this.customerId) 
    {
      this.cerror = true;
      return;
    }  
  
    if (this.customerForm.valid)  
    {
      //const { date} = this.customerForm.value;   
      this.saleService.add({ customer_id:this.customerId}).subscribe((response:any) => {
        if (response.isTrue == true) {
          console.log('after customer data',response);
          this.sale_id = response.sell_id;

        
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.saleToeventEmitter.emit(response);
          this.hideCustomerForm();
        } else {
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          this.spinner.hide();
          console.log(response);
        }

      });
    }
    else {
      Object.keys(this.customerForm.controls).forEach(field => {
        const control = this.customerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }


  // onFormSubmit() {
  //   if(this.idStock) this.stockValue = this.idStock;
  //   if (!this.stockValue || !this.customerId) 
  //   {
  //     this.cerror = true;
  //     return;
  //   }
  //   this.spinner.show();

  //   this.saleService.add({ customerId: this.customerId, stock_id: this.stockValue }).subscribe((res: any) => {
  //     if (res.isTrue == true) {
  //       this.spinner.hide();
  //       this.sale_id = res.sell_id;
  //       this.hideCustomerForm();
  //     } else {
  //       this.spinner.hide();
  //       this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
  //     }
  //   }, error => {
  //     this.spinner.hide();
  //     this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
  //   });

  // }

  getcustomerList() {
    this.saleService.customerList().subscribe((res: any) => {
      this.customers = res;
    })
  }

 


  setStock(val) {
    this.stockValue = val;
    this.getProduct();
    console.log("stockId",this.stockValue);
 
    
    console.log('stock value',this.stockValue);
  }

  setCustomer(val) {
    this.customerId = val;
    console.log('customer id',val);
  }


  getProduct() {
    this.saleService.getProduct(this.stockValue).subscribe((res: any) => {
      this.products = res;
      console.log("getproduct",res);
      
    })
  }
  



  hideCustomerForm() {
    this.showCustomerForm = false;
    this.showSellProductForm = true;
    this.getProduct();

  }


  hideSellForm() {
    this.reloadData();
    this.showSellProductForm = false;
    this.showSellProductList = true;
  }


  addNew() {

    this.showSellProductForm = !this.showSellProductForm;
    this.showSellProductList = !this.showSellProductList;
    if (this.showPaymentForm == true) {
      this.showSellProductForm = false;
      this.showPaymentForm = !this.showPaymentForm;
    }


  }


// list of the sold product
  reloadData() {
    // this.result = [];
    this.loading = true;
    this.spinner.show(); 
    this.service.saleForm(this.sale_id).subscribe((data:any) => {
      console.log('sold product',data);
      this.rows = data;
      this.tempRows = this.rows;
      this.getTotalSellPrice();
      this.cdref.detectChanges();
      this.loading = false;
      this.spinner.hide();
    }, (err) => {
      console.log('data error: ', err);
      this.loading = false;
      this.spinner.hide();
    });
  }


//Sell product list operations
  addSellProduct() {
   
    if (this.newForm.valid) { 
      this.spinner.show();
      const { qty, sell_price, product_id } = this.newForm.value;
      this.sell_price = sell_price;
      this.qty = qty;
      this.service.createSellProduct({ qty, sell_price,product_id, saleId: this.sale_id,stockId:this.stockValue }).subscribe((res) => {
        if (res == true) {
          this.sellProductEventEmitter .emit(res);
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.hideSellForm();
          this.buildForm();
          this.spinner.hide();
        }  
        else {
          this.spinner.hide();
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        } 
      },error=>{
          console.log(error);        
          this.spinner.hide();
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        });  
      }else{
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  deleteProduct(id,qty,product_id){
   const modalRef = this.modalService.open(DeleteSellProductComponent);
   modalRef.componentInstance.id = id;
   modalRef.componentInstance.qty = qty;
   modalRef.componentInstance.product_id = product_id;
   modalRef.componentInstance.stockId = this.stockValue;
    modalRef.componentInstance.saleDeleteEventEmitter.subscribe(res=>{
        this.reloadData();  
    })
  }




  //end sell product operation


  showPayForm() {
    this.showSellProductList = !this.showSellProductList;
    this.showPaymentForm = !this.showPaymentForm;
 
  }

  addPayment() {

    if(this.pForm.valid){
      this.spinner.show();
      const { payment } = this.pForm.value;
      this.debt = this.total_sell_price - payment
      this.saleService.addPayment({payment,customerId: this.customerId,sell_id:this.sale_id,debt:this.debt}).subscribe((res:any)=>{       
        if (res.isTrue == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.spinner.hide();
          this.closeModal();
           window.open(`/sales/invoice/${res.paymentId}`, '_blank');
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
      Object.keys(this.pForm.controls).forEach(field => {
        const control = this.pForm.get(field);
        control.markAsTouched({ onlySelf: true }); 
      });
    }
   
  }
  getTotalSellPrice() {
    this.total_sell_price = 0;
    this.rows.forEach((el: any) => {
      this.total_sell_price += (el.qty * el.sell_price);
    });
  }


  

}
