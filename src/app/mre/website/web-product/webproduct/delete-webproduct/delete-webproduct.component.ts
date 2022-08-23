import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { WebproductService } from '../../webproduct.service';

@Component({
  selector: 'app-delete-webproduct',
  templateUrl: './delete-webproduct.component.html',
  styleUrls: ['./delete-webproduct.component.scss']
})
export class DeleteWebproductComponent implements OnInit {
  @Input() id;
  @Output() webproductDeleteEventEmitter= new EventEmitter<Object>();
  constructor(
  private webProductService:WebproductService,
    private toaster: TranslatedToastrService, 
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.webProductService.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.webproductDeleteEventEmitter.emit(response);
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
