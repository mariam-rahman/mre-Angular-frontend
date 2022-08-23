import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { HomeInfoService } from '../home-info.service';
@Component({
  selector: 'app-add-homeinfo',
  templateUrl: './add-homeinfo.component.html',
  styleUrls: ['./add-homeinfo.component.scss']
})
export class AddHomeinfoComponent implements OnInit {
  @Output() homeinfoEventEmitter = new EventEmitter<object>();
  @Input() data
  newForm
  file: File;
  formType
  imgPath
  id
  datas
    constructor(
      private formBuilder: FormBuilder,
      public activeModal: NgbActiveModal,
      private toaster: TranslatedToastrService,
      private homeinfoService:HomeInfoService
    
    ) { }
  
    ngOnInit(): void {
      this.newForm = this.formBuilder.group({
         category_title:[this.data.category_title, [Validators.required]],
         category_description:[this.data.category_description, [Validators.required]],
         product_title:[this.data.product_title, [Validators.required]],
        product_description:[this.data.product_description, [Validators.required]],
        address:[this.data.address, [Validators.required]],
        phone1:[this.data.phone1, [Validators.required]],
        phone2:[this.data.phone2, [Validators.required]],
        email:[this.data.email, [Validators.required]],


         
       });
       this.formType = this.data.addForm
     }
   
     fileChangeEvent(event: any): void {
      this.file = event.target.files[0];
    }

  
    onFormSubmit(){
      if(this.newForm.valid){
        const {category_title,category_description,product_title, product_description,address, phone1, phone2, email} = this.newForm.value;
        this.id = this.data.id;
      this.datas = ({category_title,category_description,product_title, product_description,address, phone1, phone2, email, id:this.id});
          this.activeModal.close(this.datas);
      }
      
    }


    closeModal(){
      this.activeModal.close();
    }

}
