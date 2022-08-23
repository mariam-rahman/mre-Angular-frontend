import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { ProductService } from '../product.service';
import { CategoryService } from 'app/mre/category/category.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @Output() productCreateEventEmitter = new EventEmitter<Object>();

  newForm: FormGroup;
  categories = [];
  category;
  cerror = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toaster: TranslatedToastrService,
    private service: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      desc: [null, Validators.required],
    })
    this.getCategoryList();
  }

  onFormSubmit() {
    if (this.newForm.valid) 
    {
      if(!this.category){
       this.cerror = true;
       return;
      }
      const { name, desc } = this.newForm.value;
      this.service.add({ name, desc, category: this.category }).subscribe((response) => {
        if (response == true) {
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
          this.productCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }

      });
    }
    else {
      if(!this.category){
        this.cerror = true;
       }
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }


  setCategory(val) {
    this.cerror = false
    this.category = val;
  }
  getCategoryList() {
    this.categoryService.list().subscribe((res: any) => {
      this.categories = res;

    });
  }

  closeModal() {
    this.activeModal.close();
  }

}
