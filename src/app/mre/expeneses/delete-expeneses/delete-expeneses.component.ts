import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { ExpenesesService } from '../expeneses.service';

@Component({
  selector: 'app-delete-expeneses',
  templateUrl: './delete-expeneses.component.html',
  styleUrls: ['./delete-expeneses.component.scss']
})
export class DeleteExpenesesComponent implements OnInit {

  @Input() id
@Output() deleteExpensesEventEmitter = new EventEmitter<object>();
  constructor(
    private expenseseservices: ExpenesesService,
    private toaster: TranslatedToastrService, 
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.expenseseservices.delete(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.deleteExpensesEventEmitter.emit(response);
        this.closeModal();
			} else {
	
				this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");

			}
		});
  }

  closeModal(){
    this.activeModal.close();
  }


}
