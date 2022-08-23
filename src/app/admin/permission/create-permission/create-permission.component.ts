import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PermissionService } from '../permission.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss']
})
export class CreatePermissionComponent implements OnInit {
  @Output() permissionCreateEventEmitter = new EventEmitter<Object>();
 
  newForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private permissionService: PermissionService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
   this.newForm = this.formBuilder.group({
      name:[null, Validators.required],
     
    })
  }



  onFormSubmit(){
    if(this.newForm.valid){

      this.permissionService.addPermission(this.newForm.value).subscribe((response)=>{
        console.log('category response',response);
        if(response == true){
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        
          this.permissionCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        } },error=>{
          console.log(error); 
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

  closeModal(){
    this.activeModal.close();
  }

}
