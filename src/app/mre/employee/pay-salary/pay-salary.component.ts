import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-pay-salary',
  templateUrl: './pay-salary.component.html',
  styleUrls: ['./pay-salary.component.scss']
})
export class PaySalaryComponent implements OnInit {
  @Output() paySalaryEventEmitter = new EventEmitter<Object>();
  @Input() id
  @Input() salary;
  isError = false;
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
       salary:[this.salary, Validators.required],      
     })
   } 
 
 
   
   onFormSubmit(){

     if(this.newForm.valid){
       const {salary, created_at} = this.newForm.value;

       if(this.salary<salary) 
         {
          this.isError = true;
          return;
         } 
       this.employeeService.addSalary({salary, employee_id: this.id}).subscribe((response)=>{
         console.log('salary Add response',response);
         if(response == true){
           this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
           this.paySalaryEventEmitter.emit(response);
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
