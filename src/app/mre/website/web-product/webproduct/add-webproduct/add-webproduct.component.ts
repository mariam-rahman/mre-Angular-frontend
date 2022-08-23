import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BannerService } from 'app/mre/website/banner/banner.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { WebproductService } from '../../webproduct.service';
import{WebCategoryService} from 'app/mre/website/web-category/web-category.service'

@Component({
  selector: 'app-add-webproduct',
  templateUrl: './add-webproduct.component.html',
  styleUrls: ['./add-webproduct.component.scss']
})
export class AddWebproductComponent implements OnInit {
  @Input() data;
  newForm
  file: File;
  imgPath;
  formType=false;
  categoryValue
  cerror
  categoriesList

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toaster: TranslatedToastrService,
    private webProductService:WebproductService,
    private webCategoryService:WebCategoryService
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      name: [this.data.name,Validators.required],
      description: [this.data.description,Validators.required],
      image:[] 
    })
    this.formType = this.data.addForm
    this.imgPath = this.data.image;
    this.getCategoryList();
  }

  fileChangeEvent(event: any): void {
    this.file = event.target.files[0];
  }


  onFormSubmit() {
    if (this.newForm.valid) {
      if(!this.categoryValue){
        this.cerror = true; 
        return;
       }
      const data = new FormData();
      const { name, description } = this.newForm.value;
      data.append('name', name);
      data.append('description', description);
      data.append('avatar', this.file);
      data.append('id',this.data.id);
      data.append('category_id',this.categoryValue)

      this.activeModal.close(data)
    } else {
      if(!this.categoryValue){
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
    this.categoryValue = val;
    console.log('category id',this.categoryValue);
  }
  getCategoryList() {
    this.webCategoryService.list().subscribe((res: any) => {
      this.categoriesList = res;

    });
  }

  closeModal() {
    this.activeModal.close();
  }

}
