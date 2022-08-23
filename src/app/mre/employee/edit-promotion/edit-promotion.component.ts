import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.scss']
})
export class EditPromotionComponent implements OnInit {

  @Output() promotionEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
   private employeeservice:EmployeeService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      salary: [this.data.salary, [Validators.required]],
      designation: [this.data.designation, [Validators.required]],
    });
  }


  closeModal() {
    this.activeModal.close();
  }

  onFormSubmit() {
    
    if(this.newForm.valid){
      const {salary , designation} = this.newForm.value;
   this.employeeservice.storePromotion({salary_id:this.data.id, salary,designation}).subscribe(res=>{
     if(res)
     {
      this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
      this.promotionEditEventEmitter.emit(res);
      this.closeModal();
     }
    else
    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
   },error =>{
    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
   });
  }else {
    Object.keys(this.newForm.controls).forEach(field => {
      const control = this.newForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

}

}
