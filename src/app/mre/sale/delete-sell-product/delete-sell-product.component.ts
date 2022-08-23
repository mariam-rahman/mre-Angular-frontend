import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { SaleService } from '../sale.service';

@Component({
  selector: 'app-delete-sell-product',
  templateUrl: './delete-sell-product.component.html',
  styleUrls: ['./delete-sell-product.component.scss']
})
export class DeleteSellProductComponent implements OnInit {
  @Input() id;
  @Input() product_id;
  @Input() qty;
  @Input() stockId;
  @Output() saleDeleteEventEmitter = new EventEmitter<object>();

  saleDetails_id
  qtys
  productId
  constructor(
    private activeModal:NgbActiveModal,
    private toaster: TranslatedToastrService,
    private service:SaleService
  ) { }

  ngOnInit(): void {
  }

  
  deleteRecord(){
    this.saleDetails_id= this.id;
  this.qtys = this.qty;
    this.productId= this.product_id;
    this.service.deleteSellProduct({id:this.saleDetails_id,qty:this.qtys,product_id:this.productId,stockId:this.stockId}).subscribe((response:any) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
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
