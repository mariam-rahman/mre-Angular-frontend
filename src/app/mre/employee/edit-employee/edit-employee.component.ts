import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  @Output() employeeEditEventEmitter = new EventEmitter<Object>();

  @Input() data;
  editForm: FormGroup; 
  file:File;
 

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toaster: TranslatedToastrService,
    private employeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      phone: [this.data.phone,[Validators.required]],
      email: [this.data.email, [Validators.required,Validators.email]],
      address: [this.data.address, [Validators.required]],
      Image: [this.data.address, [Validators.required]],
      joining_date: [this.data.joining_date, [Validators.required]],
    });
    
  }



  fileChangeEvent(event: any): void {
    this.file = event.target.files[0];
  }
  onFormSubmit(){
    if(this.editForm.valid){
     
      const data = new FormData();
      const {name, email, phone, address, joining_date} = this.editForm.value;

       data.append('name',name);
       data.append('email',email);
       data.append('phone',phone);
       data.append('address',address);
       data.append('joining_date',joining_date);
       data.append('avatar',this.file);
      this.employeeService.employeeUpdate(this.data.id,data).subscribe((response)=>{
        console.log('Employee response',response);
        if(response == true){
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
      
          this.employeeEditEventEmitter.emit(response);
          this.closeModal();
        } else {       
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }
          });
} else {
  
  Object.keys(this.editForm.controls).forEach(field => {
    const control = this.editForm.get(field);
    control.markAsTouched({ onlySelf: true });
  });
}
  }

  closeModal() {
    this.activeModal.close()
  }

}
