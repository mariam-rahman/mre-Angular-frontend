import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { BannerService } from '../../banner/banner.service';
import{WebCategoryService} from 'app/mre/website/web-category/web-category.service'

@Component({
  selector: 'app-add-webcategory',
  templateUrl: './add-webcategory.component.html',
  styleUrls: ['./add-webcategory.component.scss']
})
export class AddWebcategoryComponent implements OnInit {
  @Output() webCategoryCreateEventEmitter = new EventEmitter<object>();
  @Input() data
  newForm
  file: File;
  formType
  imgPath
  
    constructor(
      private formBuilder: FormBuilder,
      public activeModal: NgbActiveModal,
      private toaster: TranslatedToastrService,
      private webcategoryService:WebCategoryService
    ) { }
  
    ngOnInit(): void {
      this.newForm = this.formBuilder.group({
         cat_name:[this.data.cat_name, [Validators.required]],
         description:[this.data.description, [Validators.required]],
         image:[null]
       });
       this.formType = this.data.addForm
       this.imgPath = this.data.image;
     }
   
     fileChangeEvent(event: any): void {
      this.file = event.target.files[0];
    }
  
    onFormSubmit() {
      if (this.newForm.valid) {
        const data = new FormData();
        const {cat_name, description } = this.newForm.value;
        data.append('cat_name', cat_name);
        data.append('description', description);
        data.append('avatar', this.file);
        data.append('id',this.data.id)
  
        this.activeModal.close(data)
      }
      else 
      {
        Object.keys(this.newForm.controls).forEach(field => {
                const control = this.newForm.get(field);
                control.markAsTouched({ onlySelf: true });
              });
      }
    }
    //  onFormSubmit() { 
    //   if (this.newForm.valid) {
    //     const data = new FormData();
    //     const {cat_name, description} = this.newForm.value;
  
    //     data.append('cat_name', cat_name);
    //     data.append('description', description);
    //     data.append('avatar', this.file);
    //     this.webcategoryService.add(data).subscribe((response) => {
    //       if (response == true) {
    //         this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
    //         this.webCategoryCreateEventEmitter.emit(response);
    //         this.closeModal();
    //       } else {
    //         this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
    //         console.log(response);
    //       }
    //     });
    //   } else {
    //     Object.keys(this.newForm.controls).forEach(field => {
    //       const control = this.newForm.get(field);
    //       control.markAsTouched({ onlySelf: true });
    //     });
    //   }
    // }
  
   
     closeModal(){
       this.activeModal.close();
     }

}
