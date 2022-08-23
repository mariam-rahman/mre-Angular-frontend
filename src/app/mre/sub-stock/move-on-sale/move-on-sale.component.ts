import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service"; 
import { SubStockService } from '../sub-stock.service'; 

@Component({
  selector: 'app-move-on-sale',
  templateUrl: './move-on-sale.component.html',
  styleUrls: ['./move-on-sale.component.scss']
})
export class MoveOnSaleComponent implements OnInit {
  @Output() moveToOnSaleEpmloyeeEventEmiter = new EventEmitter<Object>();
@Input() productId;
@Input() qty; 

newForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private subStockSerivce:SubStockService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      move_qty: [null, Validators.required],
      discount: [null,Validators.required],
      sell_price: [null, Validators.required],

    })
  }

  
  onFormSubmit() {
    if (this.newForm.valid) {
      const { move_qty, discount, sell_price } = this.newForm.value;
      if (move_qty <= this.qty) {
        this.subStockSerivce.moveToOnSale({ move_qty,discount,sell_price, product_id: this.productId }).subscribe((response) => {
          console.log('MoveTo Sub response', response);
          if (response == true) {
            this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");

            this.moveToOnSaleEpmloyeeEventEmiter.emit(response);
            this.closeModal();
          } else {

            this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
            console.log(response);
          }
        }, error => {
          console.log(error);
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        });
      }
    else{
      alert("There is no sufficient qty");
    }
    }
    else {
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
