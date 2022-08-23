import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import {EmployeeService} from './employee.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { SalaryComponent } from './salary/salary.component';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeeComponent implements OnInit {

	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows;
	tempRows = [];
	columnsWithSearch = [];
	closeResult = ''
	allGroupsData;
	data;
	loading;
	id;
	
  constructor(
    private cdref: ChangeDetectorRef,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
    private employeeService:EmployeeService,
  ) { }

  ngOnInit(): void {
    this.reloadData();
  }


  
	reloadData() {
		// this.result = [];
		this.loading = true;
		this.spinner.show();
		this.employeeService.list().subscribe((data:any) => {
			console.log(data);

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


  addNew(){
     const modalRef = this.modalService.open(CreateEmployeeComponent,{size:'lg'});
     modalRef.componentInstance.employeeCreateEventEmitter.subscribe(res =>{
       this.reloadData();
     })
  }

  deleteRecord(id){
	  this.id = id;
	  const modalRef = this.modalService.open(DeleteEmployeeComponent);
	  modalRef.componentInstance.id = id;
	  modalRef.componentInstance.deleteEpmloyeeEventEmiter.subscribe(res=>{
		  this.reloadData();
	  })
  }

  editRecord(id){
	this.employeeService.employeeEdit(id).subscribe(res=>{
		console.log("employee record ",res);
	
		const modalRef = this.modalService.open(EditEmployeeComponent);
		modalRef.componentInstance.data = res;
		modalRef.componentInstance.employeeEditEventEmitter.subscribe(res=>{
			this.reloadData();
		})
		
	})
  }

  showRecord(id){}



  refresh(){
    this.reloadData();
  }


}
