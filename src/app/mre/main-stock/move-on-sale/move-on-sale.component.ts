import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainStockService } from '../main-stock.service';
import { FormBuilder,FormGroup,Validators  } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service"; 


@Component({
  selector: 'app-move-on-sale',
  templateUrl: './move-on-sale.component.html',
  styleUrls: ['./move-on-sale.component.scss']
})
export class MoveOnSaleComponent implements OnInit {
  @Output() moveOnSaleEventEmitter = new EventEmitter<Object>();
  @Input() qty;
  @Input() product_id;
  newForm: FormGroup;

  constructor(
    private mainStockService:MainStockService,
    private formBuilder: FormBuilder,
    private activeModal:NgbActiveModal,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      move_qty:[null, Validators.required],
      discount:[null,Validators.required],
      sell_price:[null,Validators.required],
    })
  }

  onFormSubmit() {
    if (this.newForm.valid) {
      const { move_qty, discount, sell_price } = this.newForm.value;
      if (move_qty <= this.qty) {
        this.mainStockService.moveOnSale({ move_qty,discount,sell_price, product_id: this.product_id }).subscribe((response) => {
          console.log('MoveTo Sub response', response);
          if (response == true) {
            this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
            this.moveOnSaleEventEmitter.emit(response);
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
