import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import {CustomerService} from './customer.service';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { PayDebtComponent } from './pay-debt/pay-debt.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

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
		private customerService:CustomerService,
	) { }

	ngOnInit() {
		this.reloadData();
	}


  addNew(){
	  const ModalRef = this.modalService.open(CreateCustomerComponent);
	  ModalRef.componentInstance.customerCreateEventEmitter.subscribe(data=>{
		  this.reloadData();
	  })
  }

  deleteRecord(id){

  }

  editRecord(id){
	this.customerService.editCustomer(id).subscribe(res => {
		const modalRef = this.modalService.open(EditCustomerComponent);
		modalRef.componentInstance.data = res;
		modalRef.componentInstance.customerEditEventEmitter.subscribe((res) => {
			this.reloadData();
		});
	},(error)=>{ 
	
	});
  }

  paydebts(id){
	  const ModalRef = this.modalService.open(PayDebtComponent);
	  ModalRef.componentInstance.id = id;
	  ModalRef.componentInstance.subscribe(res=>{
		  this.reloadData();
	  })
  }


	refresh() {
		this.reloadData();
	}

	
	reloadData() {
		// this.result = [];
		this.loading = true;
		this.spinner.show();
		this.customerService.list().subscribe((data:any) => {
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
}
