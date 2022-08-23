import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { PurchaseService } from '../purchase.service';
@Component({
  selector: 'app-delete-purchase',
  templateUrl: './delete-purchase.component.html',
  styleUrls: ['./delete-purchase.component.scss']
})
export class DeletePurchaseComponent implements OnInit {
  @Output()purchaseDeleteEventEmitter = new EventEmitter<Object>();
@Input() id;

  constructor(
    private service:PurchaseService,
    private toaster:TranslatedToastrService,
    private activeModal:NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.service.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.purchaseDeleteEventEmitter.emit(response);
        this.closeModal();
			} else {
	
				this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_DELETEING_RECORD");

			}
		});
  }

  closeModal(){
    this.activeModal.close();
  }

}
