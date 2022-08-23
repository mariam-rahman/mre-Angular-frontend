import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, RequiredValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { EmployeeService } from '../employee.service';
import { DatePipe, formatDate } from '@angular/common';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {
  @Output() employeeCreateEventEmitter = new EventEmitter<Object>();

  newForm: FormGroup;
  file: File;
  currentDate;

  emailError = false;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private employeeService: EmployeeService,
    private toaster: TranslatedToastrService,
  ) {

  }


  ngOnInit(): void {    
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.newForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      phone: [null, [Validators.required]],
      // SSK Solution
      // phone: [null, [Validators.compose([
      //   this.patternValidator(/((\+)[0-9]{2}(\-)[0-9]{9}|(00)[0-9]{2}(\-)[0-9]{9}|[0-9]{10})/, { hasError: true})
      // ])]],
      address: [null, Validators.required],
      joining_date: [this.currentDate, Validators.required],
      designation: [null, Validators.required],
      salary: [null, Validators.required],
      image: [null, Validators.required]
    })

  }

  fileChangeEvent(event: any): void {
    this.file = event.target.files[0];
  }

  onFormSubmit() { 


    if (this.newForm.valid) {
      const data = new FormData();
      const { name, email, phone, address, joining_date, designation, salary } = this.newForm.value;

      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('address', address);
      data.append('joining_date', joining_date);
      data.append('designation', designation);
      data.append('salary', salary);
      data.append('avatar', this.file);
      this.employeeService.add(data).subscribe((response: any) => {
        if (response.unique_val != null) {
          this.emailError = response.unique_val;
          console.log('unique',this.emailError );
          return;
        }

        if (response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.employeeCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }
      });
    } else {
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }






  closeModal() {
    this.activeModal.close();
  }


  // SSK Solution for regex class
  // patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {      
  //     if (!control.value) {
  //       return null;
  //     }
  //     const valid = regex.test(control.value);
  //     return valid ? null : error;
  //   };
  // }


}
