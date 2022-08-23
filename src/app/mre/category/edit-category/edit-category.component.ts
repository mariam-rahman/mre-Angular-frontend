import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../category.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  @Output() categoryEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  newForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private toaster: TranslatedToastrService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }


  buildForm() {
    this.newForm = this.formBuilder.group({
      title: [this.data.title, [Validators.required]],
      desc: [this.data.desc, [Validators.required]],
    });
  }

  

  closeModal() {
    this.activeModal.close();
  }



  onFormSubmit() {
  
   this.categoryService.update(this.data.id, this.newForm.value).subscribe(res=>{
     if(res)
     {
      this.toaster.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
      this.categoryEditEventEmitter.emit(res);
      this.closeModal();
     }

    else{
    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");   
   }},error =>{

    this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
   });
   
  }




}
