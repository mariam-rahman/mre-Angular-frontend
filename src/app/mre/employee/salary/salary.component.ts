import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from '../employee.service';
import { PaySalaryComponent } from '../pay-salary/pay-salary.component';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {

  
  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;

	rows;
	tempRows = [];
	columnsWithSearch = [];
	loading;
	data;
	id;
  empDetails;
  salary;
  emp;

  
  constructor(
    private emplyeeService:EmployeeService,
    private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		private toaster: TranslatedToastrService,
    private activatedRoute:ActivatedRoute, 
    ) { }


ngOnInit() {
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
 // this.employeeDetails();
 this.employeeDetails();
 this.reloadData();
 
  
}

paySalary(){
  const modalRef = this.modalService.open(PaySalaryComponent);
  modalRef.componentInstance.id = this.id;
  modalRef.componentInstance.salary = this.rows[0]?.salary
  modalRef.componentInstance.paySalaryEventEmitter.subscribe(res=>{
    this.reloadData();
  })
}




employeeDetails(){
  this.emplyeeService.employeeDetails(this.id).subscribe((data:any)=>{
    console.log('Emp Details',data);
  this.emp = data;
 
  }) 
}

reloadData() {
  // this.result = [];
  this.loading = true;
  this.spinner.show();
  this.emplyeeService.salary(this.id).subscribe((data:any) => {
    console.log("salary",data);
    this.rows = data;
    this.tempRows = this.rows;
    // for specific columns to be search instead of all you can list them by name
    this.columnsWithSearch = Object.keys(this.rows[0]);
    this.cdref.detectChanges();
    this.loading = false;
    this.spinner.hide();

  }, (err) => {
    console.log('data error: ', err);
    this.loading = false;
  });
}

searchTerm(val) {
  // filter our data
  const temp = this.tempRows.filter((d) => {
    console.log(d);
    // single filter
    // return d.name.toLowerCase().indexOf(val) !== -1 || !val;

    // Multi Column Filter
    // iterate through each row's column data
    for (let i = 0; i < this.columnsWithSearch.length; i++) {
      var colValue = d[this.columnsWithSearch[i]];

      // if no filter OR colvalue is NOT null AND contains the given filter
      if (!val || (!!colValue && colValue.toString().toLowerCase().indexOf(val) !== -1)) {
        // found match, return true to add to result set
        return true;
      }
    }
  });

  // update the rows
  this.rows = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}

refresh() {
  this.reloadData();
}



}
