import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenesesService } from '../../expeneses.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { CustomerService } from 'app/mre/customer/customer.service';


@Component({
  selector: 'app-add-daily-expenses',
  templateUrl: './add-daily-expenses.component.html',
  styleUrls: ['./add-daily-expenses.component.scss']
})
export class AddDailyExpensesComponent implements OnInit {
  @Output() dailyExpenCreateEventEmitter = new EventEmitter<Object>();
  @Input() id:number;
  @Input() data:{};
  newForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.buildForm(this.data);
  }


  buildForm(item) {
    this.newForm = this.formBuilder.group({
      amount: [item.amount, Validators.required],
      event: [item.event, Validators.required],
      date: [item.date, Validators.required],
      description: [item.description, Validators.required]
    })
  }
  onFormSubmit() {
    if (this.newForm.valid) {
      const {amount, event,date, description} = this.newForm.value
      this.activeModal.close({amount, event,date, description,expense_id:this.id});
    }
    else {
      Object.keys(this.newForm.controls).forEach(field => {
        const control = this.newForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }

  }

}
