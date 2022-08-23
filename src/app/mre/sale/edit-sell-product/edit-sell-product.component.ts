import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-edit-sell-product',
  templateUrl: './edit-sell-product.component.html',
  styleUrls: ['./edit-sell-product.component.scss']
})
export class EditSellProductComponent implements OnInit {
  @Output() saleEditEventEmitter = new EventEmitter<object>();
  @Input() data;
  @Input() stockId;
  @Input() product_id;

  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toaster: TranslatedToastrService,
    private saleService:SaleService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    
  }


  buildForm() {
    this.newForm = this.formBuilder.group({
      sell_price: [this.data.sell_price, [Validators.required]],
      qty: [this.data.qty, [Validators.required]]
    });
  }

  

  closeModal() {
    this.activeModal.close();
  }



  onFormSubmit() {
  if(this.newForm.valid){
    const {qty , sell_price} = this.newForm.value; 
    this.saleService.updateSellProduct({sell_price,qty,stockId:this.stockId,sellDetailsId:this.data.id, productId:this.data.product_id}).subscribe(res=>{
      if(res)
      {
       this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
       this.saleEditEventEmitter.emit(res);
       this.closeModal();
      }
 
     else{
     this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");   
    }},error =>{
 
     this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
    });
    
   }  else {
    
    Object.keys(this.newForm.controls).forEach(field => {
      const control = this.newForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  }




}
