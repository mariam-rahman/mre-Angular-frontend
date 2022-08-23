import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { WebCategoryService } from '../web-category.service';

@Component({
  selector: 'app-delete-webcategory',
  templateUrl: './delete-webcategory.component.html',
  styleUrls: ['./delete-webcategory.component.scss']
})
export class DeleteWebcategoryComponent implements OnInit {
  @Input() id;
  @Output() bannerDeleteEventEmitter= new EventEmitter<Object>();
  constructor(
    private webcategoryService: WebCategoryService,
    private toaster: TranslatedToastrService, 
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.webcategoryService.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.bannerDeleteEventEmitter.emit(response);
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
