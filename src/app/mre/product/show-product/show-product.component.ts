import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { ProductService } from '../product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {
  newForm: FormGroup;
  @Input() data;
  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {

  }


  closeModal() {
    this.activeModal.close();
  }



}
