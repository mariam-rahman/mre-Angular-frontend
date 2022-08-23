import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { SaleService } from '../sale.service';


@Component({
  selector: 'app-sale-delete',
  templateUrl: './sale-delete.component.html',
  styleUrls: ['./sale-delete.component.scss']
})
export class SaleDeleteComponent implements OnInit {
  @Input() sale_id;
  @Output() saleDeleteEventEmitter = new EventEmitter<Object>();

  constructor(
    private saleService:SaleService,
    private toaster:TranslatedToastrService,
    private activeModal:NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.saleService.deleteSale(this.sale_id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.saleDeleteEventEmitter.emit(response);
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
