import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExpenesesService } from '../expeneses.service';
import { AddDailyExpensesComponent } from './add-daily-expenses/add-daily-expenses.component';
import { DeleteDailyExpenesesComponent } from './delete-daily-expeneses/delete-daily-expeneses.component';

@Component({
	selector: 'app-daily-expeneses',
	templateUrl: './daily-expeneses.component.html',
	styleUrls: ['./daily-expeneses.component.scss']
})
export class DailyExpenesesComponent implements OnInit {

	@ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild('tableRowDetails') tableRowDetails: any;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	tableOptions; 
	tblMsgs;
	columns;
	dataLoadingFlag: boolean;
	reorderable = true;
	swapColumns = false;
	rows: any[];
	recordsTotal: number;
	toBeDeletedRecordId: any;
	successMsg: any;
	pageLengths;
	cssClasses;
	filterForm: FormGroup;
	viewRecordInModal: any = true;
	isCollapsed: boolean = false;
	showFilterForm: boolean;
	expenseId;
	filters;

	loading = false;

	constructor(private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private fb: FormBuilder,
		private dtService: DatatablesService,
		private expenService: ExpenesesService,
		private modalService: NgbModal,
		private activatedRoute: ActivatedRoute,
		private toaster: TranslatedToastrService,
	) { }

	ngOnInit(): void { 
		this.expenseId = this.activatedRoute.snapshot.paramMap.get('id');
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();
		this.tableOptions = this.getTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);
		this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);
		this.dailyExpenses();
	}
daily
monthly
yearly
	dailyExpenses(){
		if (this.expenseId == 13){
			this.daily = 13;
			console.log(this.daily);
		}
		if (this.expenseId == 15){
			this.yearly = 15;
			console.log(this.yearly);
		}	
		if(this.expenseId == 14){
			this.monthly = 14;
			console.log(this.monthly);
		}
	}

	renderData(tableOptions, filters) {
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.expenService.ChildList(tableOptions, filters, this.expenseId).subscribe((data: any) => {
			console.log("product data", data);
			if (data == null) {
				this.rows = [];
				this.recordsTotal = 0;
			} else {

				this.spinner.hide();
				this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
				this.recordsTotal = data.count;
			}

			this.cdref.detectChanges();
			this.dataLoadingFlag = false;
		}, (err) => {
			this.spinner.hide();
			console.log('data error: ', err);
			// this.cdref.detectChanges();
		});
	}

	reload() {
		this.renderData(this.tableOptions, this.filters);
	}

	setPage(pageInfo) {
		this.tableOptions.draw = pageInfo.offset + 1;
		let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
		this.tableOptions['start'] = start;
		console.log("table start ", this.tableOptions);

		this.renderData(this.tableOptions, this.filters);
	}

	setPageLength(value) {
		console.log(value);
		this.tableOptions.length = Number(value);
		this.renderData(this.tableOptions, this.filters);
	}

	toggleFilters() {
		this.isCollapsed = !this.isCollapsed;
	}

	createFilterForm() {
		this.filterForm = this.fb.group({
			cutomer_name: []
		});
	}

	/**
	 * rowDetailsToggleExpand
	 *
	 * @param row
	 */
	rowDetailsToggleExpand(row) {
		this.tableRowDetails.rowDetail.toggleExpandRow(row);
	}
	prepareData(data) {

		return data.code;
	}
	applyFilter() {
		this.filters = this.filterForm.value;
		this.renderData(this.tableOptions, this.filters);
	}

	resetFilters() {
		this.filterForm.reset();
		this.filters = null;
		this.renderData(this.tableOptions, this.filters);
	}

	searchColumn(searchTerm, index) {
		this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
		this.renderData(this.tableOptions, this.filters);
	}

	orderColumn(columnOptions, index) {
		if (columnOptions['orderable'] == true) {
			this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
			this.renderData(this.tableOptions, this.filters);
		}
	}

	onSort(event) {
		// event was triggered, start sort sequence
		console.log('Sort Event', event);
		event.sorts[0].prop
		let index = this.dtService.getColumnIndex(this.tableOptions, event.sorts[0].prop);
		this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
		this.renderData(this.tableOptions, this.filters);
	}

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "id"
				},
				{
					"data": "employee_name"
				},
				{
					"data": "event"
				},
				{
					"data": "amount"
				},
				{
					"data": "description"
				},
				{
					"data": "date"
				},
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}



	addNew() {
		this.spinner.show();
		const modalRef = this.modalService.open(AddDailyExpensesComponent);
		modalRef.componentInstance.id = this.expenseId;
		modalRef.componentInstance.data = {amount:'',event:'',date:'',description:''}
		modalRef.result.then((result)=>{
           this.expenService.childAdd(result).subscribe(data=>{
			   if(data == true)
			   {
				this.toaster.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
				this.reload();
			   } 
			   else this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
			   
		   })
		   this.spinner.hide();
		})
	}

	editRecord(row) {
		this.spinner.show();
		const modalRef = this.modalService.open(AddDailyExpensesComponent);
		modalRef.componentInstance.id = 0;
		modalRef.componentInstance.data = {amount:row.amount,event:row.event,date:row.date,description:row.description}
		modalRef.result.then((result)=>{
           this.expenService.childUpdate(result,row.id).subscribe(data=>{
			   if(data == true)
			   {
				this.toaster.success("SUCCESS", "Record updated successfully");
				this.reload();
			   } 
			   else this.toaster.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
			   
		   })
		   this.spinner.hide();
		})
	}
 
	deleteRecord(id) {

		const modalRef = this.modalService.open(DeleteDailyExpenesesComponent);
	     modalRef.componentInstance.id = id;
		 modalRef.componentInstance.deleteDailyExpensesEventEmitter.subscribe((res)=>{
		 this.reload();
		 });
    // this.expenService.childDelete(id).subscribe(res=>{ 
    //    if(res == true) this.reload();
	// });
	}
}
