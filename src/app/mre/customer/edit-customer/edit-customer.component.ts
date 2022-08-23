import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Output() customerEditEventEmitter = new EventEmitter<object>();
  @Input() data
  newForm:FormGroup;

  constructor(
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private activeModal:NgbActiveModal,
    private toaster:TranslatedToastrService,
  ) { }

  ngOnInit(): void {
  this.newForm = this.formBuilder.group({ 
    name:[this.data.name, Validators.required],
    email: [this.data.email, [Validators.required]],
    phone: [this.data.phone, [Validators.required]],
    address:[this.data.address, Validators.required],
  })
  }

  onFormSubmit() {
    if (this.newForm.valid)  
    {
      const { name, email, phone, address } = this.newForm.value;
      this.customerService.updateCustomer({ name, email, phone, address,id:this.data.id }).subscribe((response) => {
        if (response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.customerEditEventEmitter.emit(response);
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
