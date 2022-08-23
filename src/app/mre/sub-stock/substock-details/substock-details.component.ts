
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { all } from 'core-js/fn/promise';
import { SubStockService } from '../sub-stock.service';

@Component({
	selector: 'app-substock-details',
	templateUrl: './substock-details.component.html',
	styleUrls: ['./substock-details.component.scss']
})
export class SubstockDetailsComponent implements OnInit {

	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	rows;
	tempRows = [];
	columnsWithSearch = [];
	data;
	loading;
	substock;
	product;
	id
	


	constructor(
		private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private subStockservice: SubStockService,
		private activatedRoute: ActivatedRoute,

	) { }


  
	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		
		this.reloadData();
		
	
	

	}

// stocks(){
// if(this.rows.stock_id == 1){
// 	this.stock = "Main stock";
// }
// else{
// 	this.stock = "sub stock";
// }
// }

goBack(){
	
}
	refresh() {
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.subStockservice.subDetails(this.id).subscribe((data:any) => {
		
		console.log("data",data);	
			this.rows = data.items;
			this.substock = data.sub;
			this.product = data.product;
			this.tempRows = this.rows;
			// for specific columns to be search instead of all you can list them by name
			this.columnsWithSearch = Object.keys(this.rows[0]);
			this.cdref.detectChanges();
			this.loading = false;
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






















// import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
// import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
// import { DateConvertService } from 'app/services/date-convert.service';
// import { Globals } from 'app/_helpers/globals';
// import { DataTableColumn } from 'app/_models/datatable-column';
// import { DatatablesService } from 'app/_services/datatables.service';
// import { NgxSpinnerService } from 'ngx-spinner';

// import { SubStockService } from '../sub-stock.service';
// @Component({
//   selector: 'app-substock-details',
//   templateUrl: './substock-details.component.html',
//   styleUrls: ['./substock-details.component.scss']
// })
// export class SubstockDetailsComponent implements OnInit {

//   @ViewChild(DatatableComponent) table: DatatableComponent;
// 	@ViewChild('tableRowDetails') tableRowDetails: any;
// 	ColumnMode = ColumnMode;
// 	SelectionType = SelectionType;
// 	tableOptions;
// 	tblMsgs;
// 	columns;
// 	dataLoadingFlag: boolean;
// 	reorderable = true;
// 	swapColumns = false;
// 	rows: any[];
// 	recordsTotal: number;
// 	toBeDeletedRecordId: any;
// 	successMsg: any;
// 	pageLengths;
// 	cssClasses;

// 	filterForm: FormGroup;
// 	viewRecordInModal: any = true;
// 	isCollapsed: boolean = false;
// 	showFilterForm: boolean;

// 	filters;
// 	id;
// 	loading = false;

//   constructor(
//     private cdref: ChangeDetectorRef, 
// 		public translate: TranslateService,
// 		private spinner: NgxSpinnerService,
// 		private fb: FormBuilder,
// 		private dtService: DatatablesService,
// 		private subStockservice:SubStockService,
// 		private modalService: NgbModal,
// 		private activatedRoute: ActivatedRoute,

//     public globals: Globals,
//   ) { }

//   ngOnInit(): void {
// 	this.activatedRoute.queryParams.subscribe((params: Params) => {
//         this.id = params['id'];
//       });
//   }

//   details() {
// 	const modalRef = this.modalService.open(SubstockDetailsComponent);
// 	modalRef.componentInstance.createPurchaseEventEmitter.subscribe(res=>{
// 		this.reload() ;
// 	});	

// }


// renderData(tableOptions, filters) {
// 	// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
// 	this.dataLoadingFlag = true;
// 	this.spinner.show();
// 	this.subStockservice.subDetails(this.id).subscribe((data: any) => {
// 		console.log("substock data", data);
// 		if (data == null) {
// 			this.rows = [];
// 			this.recordsTotal = 0;
// 		} else {

// 			this.spinner.hide();
// 			this.rows = this.dtService.parseDatatableData(this, tableOptions, data.data);
// 			this.recordsTotal = data.count;
// 		}

// 		this.cdref.detectChanges();
// 		this.dataLoadingFlag = false;
// 	}, (err) => {
// 		this.spinner.hide();
// 		console.log('data error: ', err);
// 		// this.cdref.detectChanges();
// 	});
// }

// reload() {
// 	this.renderData(this.tableOptions, this.filters);
// }

// setPage(pageInfo) {
// 	this.tableOptions.draw = pageInfo.offset + 1;
// 	let start = (this.tableOptions.draw * this.tableOptions.length) - this.tableOptions.length;
// 	this.tableOptions['start'] = start;
// 	console.log("table start ", this.tableOptions);

// 	this.renderData(this.tableOptions, this.filters);
// }

// setPageLength(value) {
// 	console.log(value);
// 	this.tableOptions.length = Number(value);
// 	this.renderData(this.tableOptions, this.filters);
// }

// toggleFilters() {
// 	this.isCollapsed = !this.isCollapsed;
// }

// createFilterForm() {
// 	this.filterForm = this.fb.group({
// 		product_name: []
// 	});
// }

// /**
//  * rowDetailsToggleExpand
//  *
//  * @param row
//  */
// rowDetailsToggleExpand(row) {
// 	this.tableRowDetails.rowDetail.toggleExpandRow(row);
// }
// prepareData(data) {

// 	return data.code;
// }
// applyFilter() {
//    this.filters = this.filterForm.value;
// 	this.renderData(this.tableOptions, this.filters);
// }

// resetFilters() {
// 	this.filterForm.reset();
// 	this.applyFilter();
// }

// searchColumn(searchTerm, index) {
// 	this.tableOptions = this.dtService.searchColumn(this.tableOptions, index, searchTerm);
// 	this.renderData(this.tableOptions, this.filters);
// }

// orderColumn(columnOptions, index) {
// 	if (columnOptions['orderable'] == true) {
// 		this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
// 		this.renderData(this.tableOptions, this.filters);
// 	}
// }

// onSort(event) {
// 	// event was triggered, start sort sequence
// 	console.log('Sort Event', event);
// 	event.sorts[0].prop
// 	let index = this.dtService.getColumnIndex(this.tableOptions, event.sorts[0].prop);
// 	this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
// 	this.renderData(this.tableOptions, this.filters);
// }

// 	getTableOptions() {
// 		return {
// 			"draw": 1,
// 			"columns": [
// 				{
// 					"data": "id"
// 				},
// 				{
// 					"data": "product_name"
// 				},
// 				{
// 					"data": "qty"
// 				},
// 				{
// 					"data": "remining_qty"
// 				},
// 				{
// 					"data": "stock"
// 				},
// 				{
// 					"data": "category"
// 				},
// 				{
// 					"data": "transfer_date"
// 				},
// 			],
// 			"order": [{ "column": 0, "dir": "desc" }],
// 			"start": 0,
// 			"length": 10,
// 			"search": { "value": "", "regex": false }
// 		}
// 	}
// }
