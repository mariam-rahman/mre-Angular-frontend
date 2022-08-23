import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { CategoryService } from 'app/mre/category/category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Output() productUpdateEventEmitter = new EventEmitter<Object>();
  @Input() data;
  category;
  categories;
  newForm: FormGroup; 
  categoryId;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.categoryId = this.data.category_id;

    this.newForm = this.formBuilder.group({
      name: [this.data.name, [Validators.required]],
      desc: [this.data.desc, [Validators.required]],
      category_id: [null, [Validators.required]],
    });
    this.getCategoryList();

  }


  closeModal() {
    this.activeModal.close()
  }

  setCategory(val) {
    this.categoryId = val;
    console.log('categories',this.category);
  }
  getCategoryList() {
    this.categoryService.list().subscribe((res: any) => {
      this.categories = res;
      

    })

  }

  onFormSubmit() {
    const {name, desc}= this.newForm.value;
    this.productService.update({name,desc,id:this.data.id,cat_id:this.categoryId}).subscribe(res => {
      if (res) {
        this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
        this.productUpdateEventEmitter.emit(res);
        this.closeModal();
      }
      else
        this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
    }, error => {    
      this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
    });
  }

}
