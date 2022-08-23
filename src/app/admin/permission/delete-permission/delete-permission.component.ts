import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-delete-permission',
  templateUrl: './delete-permission.component.html',
  styleUrls: ['./delete-permission.component.scss']
})
export class DeletePermissionComponent implements OnInit {

  @Input() id;
  @Output() permissionDeleteEventEmitter = new EventEmitter<Object>();
 constructor(
   private service:PermissionService,
   private toaster: TranslatedToastrService, 
   private activeModal:NgbActiveModal
 ) { }

 ngOnInit(): void {
 }

 deleteRecord(){
   this.service.deletePermission(this.id).subscribe((response) => {
     if (response == true) {
       this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
       this.permissionDeleteEventEmitter.emit(response);
       this.closeModal();
     } else {
 
       this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");

     }
   });
 }

 closeModal(){
   this.activeModal.close();
 }

}
