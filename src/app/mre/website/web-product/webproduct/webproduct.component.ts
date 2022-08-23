import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {WebproductService} from 'app/mre/website/web-product/webproduct.service';
import { AddWebproductComponent } from './add-webproduct/add-webproduct.component';
import { DeleteWebproductComponent } from './delete-webproduct/delete-webproduct.component';




@Component({
  selector: 'app-webproduct',
  templateUrl: './webproduct.component.html',
  styleUrls: ['./webproduct.component.scss']
})
export class WebproductComponent implements OnInit {
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

	constructor(
		private cdref: ChangeDetectorRef,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		private webproductService:WebproductService,
		private authService:AuthService
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
		this.webproductService.list().subscribe(data => {
			console.log('banner Data',data);

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

	addNew() {
		const isAuthorized = this.authService.roles.includes('create_category');
		if (isAuthorized || this.authService.isAdmin) {
	   const modalRef = this.modalService.open(AddWebproductComponent);
	   modalRef.componentInstance.data = {addForm:true, name: '', description: '', image: '' }
	   modalRef.result.then((result) => {
		   this.webproductService.add(result).subscribe((response) => {
			   if (response)
				   this.reloadData()
		   })
	   })
		} else window.alert("You are not authorized");
   }


	deleteRecord(id) {
		const isAuthorized = this.authService.roles.includes('delete_category');
		if(isAuthorized || this.authService.isAdmin )
		{
		this.id = id;
		const modalRef = this.modalService.open(DeleteWebproductComponent);
	     modalRef.componentInstance.id = id;
		 modalRef.componentInstance.webproductDeleteEventEmitter.subscribe((res)=>{
			 this.reloadData();
		 });
		} else window.alert("You are not authorized");
	}


	editRecord(data) {
		const modalRef = this.modalService.open(AddWebproductComponent);
		modalRef.componentInstance.data = data;
		modalRef.result.then((result) => {
			this.webproductService.add(result).subscribe((response) => {
				if (response) this.reloadData()
			})
		})
	}

}
