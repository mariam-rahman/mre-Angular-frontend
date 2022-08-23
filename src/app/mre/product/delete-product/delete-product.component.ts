import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ProductService } from '../product.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent implements OnInit {  
  @Input() id;
  @Output()productDeleteEventEmitter = new EventEmitter<Object>();

  constructor(
    private service:ProductService,
    private toaster:TranslatedToastrService,
    private activeModal:NgbActiveModal,
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.service.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_DELETED_SUCCESSFULLY");
        this.productDeleteEventEmitter.emit(response);
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
