import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {

  @Input() id;
   @Output() deleteEpmloyeeEventEmiter = new EventEmitter<Object>();
  constructor(
    private employeeService:EmployeeService,
    private toaster: TranslatedToastrService,
    private activeModal:NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  deleteRecord(){
    this.employeeService.deleteEmployee(this.id).subscribe((response) => {
			if (response == true) {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        this.deleteEpmloyeeEventEmiter.emit(response);
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
