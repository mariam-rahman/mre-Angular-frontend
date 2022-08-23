import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {
  @Output() promotionCreateEventEmitter = new EventEmitter<Object>();
 @Input() id
  newForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private toaster: TranslatedToastrService,
    private employeeService:EmployeeService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      salary:[null, Validators.required],
      designation:[null, Validators.required]
    
      
    })
  } 


  
  onFormSubmit(){
    console.log('here is the emp id',this.id);
    if(this.newForm.valid){
      const {salary, designation}= this.newForm.value;
      this.employeeService.addpromotion({salary, designation, employee_id: this.id}).subscribe((response)=>{
        console.log('promotion Add response',response);
        if(response == true){
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.promotionCreateEventEmitter.emit(response);
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
