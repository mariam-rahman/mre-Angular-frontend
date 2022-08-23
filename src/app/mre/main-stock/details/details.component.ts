import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { MainStockService } from '../main-stock.service';


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
	mainStock;
	product;
	id

  constructor(
    private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private activatedRoute: ActivatedRoute,
    private mainStockService:MainStockService,
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
  this.mainStockService.details(this.id).subscribe((data:any) => {
  
    
    this.rows = data.items;
    this.mainStock = data.main;
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
