import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteExpenesesComponent } from './delete-expeneses/delete-expeneses.component';
import { ExpenesesAddComponent } from './expeneses-add/expeneses-add.component';
import { ExpenesesService } from './expeneses.service';



@Component({
	selector: 'app-expeneses',
	templateUrl: './expeneses.component.html',
	styleUrls: ['./expeneses.component.scss']
})
export class ExpenesesComponent implements OnInit {

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
		private expService: ExpenesesService,
	) { }

	ngOnInit() {
		this.reloadData();
	}


	refresh() {
		this.reloadData();
	}
	reloadData() {
		// this.result = [];
		this.loading = true;
		this.spinner.show();
		this.expService.list().subscribe((data: any) => {
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
			this.spinner.hide();
		});
		this.spinner.hide();
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


	//Operations
	add() {
		const modalRef = this.modalService.open(ExpenesesAddComponent);
		modalRef.componentInstance.id = 0;
		modalRef.componentInstance.data = { name: '', discription: '' };
		modalRef.result.then((result) => {
          this.expService.add(result).subscribe(data=>{
			  if(data == true) this.reloadData();
		  })
		})
	}

	edit(row) {
		const modalRef = this.modalService.open(ExpenesesAddComponent);
		modalRef.componentInstance.id = row.id;
		modalRef.componentInstance.data = { name: row.name, discription: row.discription };
		modalRef.result.then((result) => {
          this.expService.update(row.id,result).subscribe(data=>{
			  if(data == true) this.reloadData();
		  })
		})
	}

	delete(id) {
		const modelRef = this.modalService.open(DeleteExpenesesComponent);
		modelRef.componentInstance.id = id;
		modelRef.componentInstance.deleteExpensesEventEmitter.subscribe(res=>{
			this.reloadData();
		})
		
	}



}
