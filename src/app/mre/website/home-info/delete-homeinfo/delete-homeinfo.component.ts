import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { HomeInfoService } from '../home-info.service';

@Component({
  selector: 'app-delete-homeinfo',
  templateUrl: './delete-homeinfo.component.html',
  styleUrls: ['./delete-homeinfo.component.scss']
})
export class DeleteHomeinfoComponent implements OnInit {
  @Input() id;
  @Output() homeinfoEventEmitter= new EventEmitter<Object>();
  constructor(
    private homeInfoService:HomeInfoService,
    private toaster: TranslatedToastrService, 
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){ 
    this.homeInfoService.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.homeinfoEventEmitter.emit(response);
        this.closeModal();
			} else {
	
				this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_DELETING_RECORD");

			}
		});
  }

  closeModal(){
    this.activeModal.close();
  }

}
