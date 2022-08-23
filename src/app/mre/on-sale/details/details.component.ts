import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { OnSaleService } from '../on-sale.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	rows;
	tempRows = [];
	columnsWithSearch = [];
	data;
	loading;
	product;
	id
	totalOnsale;
	constructor(
		private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private onSaleService: OnSaleService,
		private activatedRoute: ActivatedRoute,

	) { }


  
	ngOnInit() {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');	
		this.reloadData();
	}

  refresh() {
		this.reloadData();
	}

	reloadData() {
		// this.result = [];
		this.loading = true;
		this.onSaleService.OnSaleDetails(this.id).subscribe((data:any) => {	
			if(data != null){
				this.rows = data.onsaleDetails;
				this.totalOnsale = data.totalOnsale;
				this.tempRows = this.rows;
				this.product = data.product
			}
		
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

		const temp = this.tempRows.filter((d) => {

			for (let i = 0; i < this.columnsWithSearch.length; i++) {
				var colValue = d[this.columnsWithSearch[i]];
				if (!val || (!!colValue && colValue.toString().toLowerCase().indexOf(val) !== -1)) {
					return true;
				}
			}
		});
		this.rows = temp;
		this.table.offset = 0;
	}

}
