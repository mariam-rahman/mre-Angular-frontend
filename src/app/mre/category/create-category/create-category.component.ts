import { Component, EventEmitter, OnInit, Output } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from "app/services/translated-toastr.service";
import { CategoryService } from '../category.service'; 
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
 @Output() categoryCreateEventEmitter = new EventEmitter<Object>();
 
  newForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private service: CategoryService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
   this.newForm = this.formBuilder.group({
      title:[null, [Validators.required]],
      desc:[null, [Validators.required]]
    })
  }



  onFormSubmit(){
    if(this.newForm.valid){

      this.service.add(this.newForm.value).subscribe((response)=>{
        console.log('category response',response);
        if(response == true){
          this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        
          this.categoryCreateEventEmitter.emit(response);
          this.closeModal();
        } else {
          
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          console.log(response);
        } },error=>{
          console.log(error); 
          this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
          });
}
else
{
  Object.keys(this.newForm.controls).forEach(field => {
    const control = this.newForm.get(field);
    control.markAsTouched({ onlySelf: true });
  });
}
  }

  closeModal(){
    this.activeModal.close();
  }

}
