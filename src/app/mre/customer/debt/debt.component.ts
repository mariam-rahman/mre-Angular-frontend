import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})
export class DebtComponent implements OnInit {
  @Output() customerDebtEventEmitter = new EventEmitter<Object>();
 @Input() id;
  newForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toaster: TranslatedToastrService,
    private spinner: NgxSpinnerService,
    private customerService:CustomerService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
       paid:[null, Validators.required],
     
     })
   }


  
  closeModal() {
    this.activeModal.close();    
  }

  onFormSubmit() { 
    if (this.newForm.valid) {  
    
      this.spinner.show();
      const { debt} = this.newForm.value;
      this.customerService.customerDebt({customerId:this.id, debt} ).subscribe((res:any) => {
        console.log(res);
        
        if (res.response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.customerDebtEventEmitter.emit(res);
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
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true }); 
      });
    }
  }

}
