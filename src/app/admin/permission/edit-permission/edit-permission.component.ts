import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {
  @Output() permissionEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private permissionService: PermissionService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.newForm = this.formBuilder.group({
      name: [this.data.title, [Validators.required]],
    });
  }

  

  closeModal() {
    this.activeModal.close();
  }



  onFormSubmit() {
  
   this.permissionService.updatePermission(this.data.id, this.newForm.value).subscribe(res=>{
     if(res)
     {
      this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
      this.permissionEditEventEmitter.emit(res);
      this.closeModal();
     }

    else{
    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");   
   }},error =>{

    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
   });
   
  }

}
