import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { SaleService } from '../sale.service';

@Component({
	selector: 'app-invoice',
	templateUrl: './invoice.component.html',
	styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
	@ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows;
	tempRows = [];
	columnsWithSearch = [];
	data;
	loading;
	id;
	payment;

	totalPayment = 0.0;
	constructor(
		private cdref: ChangeDetectorRef,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		private service: SaleService,
		private activatedRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.spinner.show();
		this.service.printInvoice(this.id).subscribe((data: any) => {

			this.payment = data.payment
			this.totalPayment = parseFloat(this.payment.paid) + parseFloat(this.payment.debt);
			this.rows = data.products;
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

}
