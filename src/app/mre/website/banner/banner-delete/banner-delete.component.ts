import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { BannerService } from '../banner.service';
 
@Component({
  selector: 'app-banner-delete',
  templateUrl: './banner-delete.component.html',
  styleUrls: ['./banner-delete.component.scss']
})
export class BannerDeleteComponent implements OnInit {
  @Input() id;
  @Output() bannerDeleteEventEmitter= new EventEmitter<Object>();
  constructor(
    private bannerService:BannerService,
    private toaster: TranslatedToastrService, 
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.bannerService.delete(this.id).subscribe((response) => {
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
