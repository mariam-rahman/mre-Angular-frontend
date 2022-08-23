import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { BannerService } from '../banner.service';

@Component({
  selector: 'app-banner-update',
  templateUrl: './banner-update.component.html',
  styleUrls: ['./banner-update.component.scss']
})
export class BannerUpdateComponent implements OnInit {
  @Output() bannerUpdateEventEmitter = new EventEmitter<object>();
  @Input() data
  @Input() id
  newForm: FormGroup;  
  file:File;
  constructor(
   private formBuilder:FormBuilder,
   public activeModal: NgbActiveModal,
   private toaster: TranslatedToastrService,
   private bannerService: BannerService,
  
  ) { }

  ngOnInit(): void {
    this.newForm = this.formBuilder.group({
      title: [this.data.title,Validators.required],
      sub_title: [this.data.sub_title,Validators.required],
      description: [this.data.description,Validators.required],
      image:[this.data.image,Validators.required] 
    })
  }

 
  closeModal() {
    this.activeModal.close()
  }
  fileChangeEvent(event: any): void {
    this.file = event.target.files[0];
  }
  onFormSubmit(){
    if(this.newForm.valid){
     
      const data = new FormData();
      const {title, sub_title, description} = this.newForm.value;

       data.append('title',"title");
       data.append('sub_title',"sub_title");
       data.append('description',"description");
       data.append('avatar',"this.file");
       
      this.bannerService.update(this.id,data).subscribe((response)=>{
        console.log('Banner response',response);
        if(response == true){
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
      
          this.bannerUpdateEventEmitter.emit(response);
          this.closeModal();
        } else {       
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        }
          });
}
  }



}
