import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../customer.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  @Output() customerpayEventEmitter = new EventEmitter<Object>();
  @Input() id
   newForm:FormGroup;
   constructor(
     private formBuilder: FormBuilder,
     public activeModal: NgbActiveModal,
     private spinner: NgxSpinnerService,
     private toaster: TranslatedToastrService,
     private customerService:CustomerService,
   ) { }
 
   ngOnInit(): void {
     this.newForm = this.formBuilder.group({
      amount:[null, Validators.required],      
     })
   } 
 
 
   
   onFormSubmit(){
     console.log('here is the emp id',this.id);
     if(this.newForm.valid){
       const {amount}= this.newForm.value;
       this.customerService.pay({amount, customer_id: this.id}).subscribe((response)=>{
         console.log('pay response',response);
         if(response == true){
           this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
           this.customerpayEventEmitter.emit(response);
           this.closeModal();
         } else {
           this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
           console.log(response);
         }
 
           });
 }else {
   Object.keys(this.newForm.controls).forEach(field => {
     const control = this.newForm.get(field);
     control.markAsTouched({ onlySelf: true });
   });
 }
   }
 
   closeModal(){
     this.activeModal.close();
   }

}
