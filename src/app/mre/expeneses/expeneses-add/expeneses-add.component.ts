import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { ExpenesesService } from '../expeneses.service';

@Component({
  selector: 'app-expeneses-add',
  templateUrl: './expeneses-add.component.html',
  styleUrls: ['./expeneses-add.component.scss']
})
export class ExpenesesAddComponent implements OnInit {
  @Input() data: {};
  @Input() id: number;
  @Output() expCreateEventEmitter = new EventEmitter<object>();
  newForm:FormGroup;
   
  constructor(
    private formBuilder:FormBuilder,
    public activeModal:NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.buildForm(this.data);
  }

  buildForm(item)
  {
    this.newForm = this.formBuilder.group({ 
      name:[item.name, Validators.required],
      discription:[item.discription, Validators.required],
    })
  }

  submitForm(){
    this.activeModal.close(this.newForm.value);
  }

}
