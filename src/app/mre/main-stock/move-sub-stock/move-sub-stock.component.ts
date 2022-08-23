import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { MainStockService } from '../main-stock.service'; 

@Component({
  selector: 'app-move-sub-stock',
  templateUrl: './move-sub-stock.component.html',
  styleUrls: ['./move-sub-stock.component.scss']
})
export class MoveSubStockComponent implements OnInit {

  @Output() mainMoveEventEmitter = new EventEmitter<Object>();
  @Input() id;
  @Input() qty;
  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private mainStockService: MainStockService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      move_qty: [null, Validators.required],
    })
  }



  onFormSubmit() {
    if (this.newForm.valid) {
      const { move_qty } = this.newForm.value;
      if (this.qty >= move_qty) {
        this.mainStockService.moveToSub({ move_qty, product_id: this.id }).subscribe((response) => {
          console.log('MoveTo Sub response', response);
          if (response == true) {
            this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");

            this.mainMoveEventEmitter.emit(response);
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
