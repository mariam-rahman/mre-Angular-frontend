import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from './product.service';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { DownloadServiceService } from '../services/download-service.service';
import { ExcelServiceService } from '../services/excel-service.service';
import { formatDate } from '@angular/common';
import { AuthService } from 'app/template/shared/auth/auth.service';


@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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
		private service: ProductService,
		private modalService: NgbModal,
		private downloadService: DownloadServiceService,
		private excelService: ExcelServiceService,
		private authService:AuthService
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



	renderData(tableOptions, filters) {
		// the serverside and ngx-datatable page number is different. ngx-datatable start with 0 and serverside start with 1
		this.dataLoadingFlag = true;
		this.spinner.show();
		this.service.list(tableOptions, filters).subscribe((data: any) => {
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
			product_name: [null,[Validators.required]]
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
		let index = this.dtService.getColumnIndex(this.tableOptions, event.sorts[0].prop);
		this.tableOptions = this.dtService.orderColumn(this.tableOptions, index);
		this.renderData(this.tableOptions, event.sorts[0]);
	}
	addNewRecord() {

		const modalRef = this.modalService.open(CreateProductComponent);
		modalRef.componentInstance.productCreateEventEmitter.subscribe(res => {
			this.reload();
		});

	}

	// viewProductDetails(id) {
	// 	this.service.show(id).subscribe((data: any) => {
	// 		console.log(data);
	// 		const modalRef = this.modalService.open(ShowProductComponent);
	// 		modalRef.componentInstance.data = data;
	// 	});

	// }


	editRecord(recordId) {
		this.service.getById(recordId).subscribe(res => {
			const modalRef = this.modalService.open(EditProductComponent);	
			modalRef.componentInstance.data = res;
		
		modalRef.componentInstance.productUpdateEventEmitter.subscribe(res => {
			this.reload();
		})
	});
	}
	//  editRecord() {
	// 	this.loading = true;
	// }

	deleteRecord(id) {
		const modalRef = this.modalService.open(DeleteProductComponent);
		modalRef.componentInstance.id = id;
		modalRef.componentInstance.productDeleteEventEmitter.subscribe(() => {
			this.reload();
		});
	}

	getTableOptions() {
		return {
			"draw": 1,
			"columns": [
				{
					"data": "id"
				},
				{
					"data": "name"
				},
				{
					"data": "desc"
				},
				{
					"data": "category"
				},
				{
					"data": "active"
				},
				{
					"data": "remainingQty"
				},
				{
					"data": "Qty"
				},
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



	exportAsXLSX(): void {
		this.spinner.show();
		if (this.filterForm.valid) {
			const data = new FormData();
			data.append('product_name', this.filterForm.get('product_name').value);

			this.downloadService.getProducts(data).subscribe((data: any) => {
				if (data != null)
					this.excelService.exportAsExcelFile(data, this.filterForm.get('product_name').value + '_product');
				this.spinner.hide();
			})
		}
		else {
			const cValue = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

			this.downloadService.getProducts(null).subscribe((data: any) => {
				if (data != null)
					this.excelService.exportAsExcelFile(data, cValue + '_product');
				this.spinner.hide();
			})

		}

	}


	checkPermission(p)
	{
     return this.authService.checkRole(p);
	}

}
