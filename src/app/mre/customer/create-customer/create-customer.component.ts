import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service";


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent implements OnInit { 
  @Output() customerCreateEventEmitter = new EventEmitter<object>();
  newForm:FormGroup;

  constructor(
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private activeModal:NgbActiveModal,
    private toaster:TranslatedToastrService,
  ) { }

  ngOnInit(): void {

   
  this.newForm = this.formBuilder.group({ 
    name:[null, Validators.required],
    email: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    address:[null, Validators.required],
  })
  }

  onFormSubmit() {
    if (this.newForm.valid)  
    {
      const { name, email, phone, address } = this.newForm.value;
      this.customerService.add({ name, email, phone, address }).subscribe((response) => {
        if (response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.customerCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }

      });
    }
    else {
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
