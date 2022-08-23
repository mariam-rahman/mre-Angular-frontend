import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { DataTableColumn } from 'app/_models/datatable-column';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PurchaseService } from './purchase.service';


import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { EditPurchaseComponent } from './edit-purchase/edit-purchase.component';
import { DeleteCategoryComponent } from '../category/delete-category/delete-category.component';
import { DeleteProductComponent } from '../product/delete-product/delete-product.component';
import { DeletePurchaseComponent } from './delete-purchase/delete-purchase.component';

@Component({
	selector: 'app-purchase',
	templateUrl: './purchase.component.html',
	styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
	id;
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

	filters;

	loading = false;

	constructor(private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private spinner: NgxSpinnerService,
		private router: Router,
		private fb: FormBuilder,
		private dtService: DatatablesService,
		private service: PurchaseService,
		private modalService: NgbModal,
	) { }

	ngOnInit(): void {
		this.filters = null;
		this.pageLengths = this.dtService.pageLengths;
		this.cssClasses = this.dtService.cssClasses;
		this.tblMsgs = this.dtService.getTableMsgs();

		this.tableOptions = this.getTableOptions();
		this.columns = this.dtService.getColumnsArray(this.tableOptions);

		this.createFilterForm();
		this.renderData(this.tableOptions, this.filters);

	}

	addNewRecord() {
		const modalRef = this.modalService.open(CreatePurchaseComponent);
		modalRef.componentInstance.createPurchaseEventEmitter.subscribe(res=>{
			this.reload() ;
		});	
	}
 
	editRecord(id) {
		this.service.getById(id).subscribe((res: any) => {
			const modalRef = this.modalService.open(EditPurchaseComponent);
			modalRef.componentInstance.data = res;
			modalRef.componentInstance.purchaseEditEventEmitter.subscribe((res) => {
				this.reload();
			})
		});

	}

	deleteRecord(id) {
		this.id = id;
		const modalRef = this.modalService.open(DeletePurchaseComponent);
		modalRef.componentInstance.id = id;
		modalRef.componentInstance.purchaseDeleteEventEmitter.subscribe((res) => {
			this.reload();
		})
	}



	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.service.list(tableOptions, filters).subscribe((data: any) => {
			console.log("purchase data", data);
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
			product_name: []
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
		this.applyFilter();
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
					"data": "product"
				},
				{
					"data": "price"
				},
				{
					"data": "qty"
				},
				{
					"data": "remaining_qty"
				},
				{
					"data": "stock"
				}
			],
			"order": [{ "column": 0, "dir": "desc" }],
			"start": 0,
			"length": 10,
			"search": { "value": "", "regex": false }
		}
	}

	viewDocumentDetails(packageId) {
		this.router.navigate([`packages/view/${packageId}`])
	}

}
