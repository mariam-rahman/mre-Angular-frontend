import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DebtComponent } from '../debt/debt.component';
import { PayComponent } from '../pay/pay.component';


@Component({
  selector: 'app-pay-debt',
  templateUrl: './pay-debt.component.html',
  styleUrls: ['./pay-debt.component.scss']
})
export class PayDebtComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;
	rows;
	tempRows = [];
	columnsWithSearch = [];
	data;
	loading;
  customerData;
  customerName;
	id;
totalPaid=0;
totalDebt=0;



  constructor(
  	private cdref: ChangeDetectorRef,
		public translate: TranslateService,
		private activatedRoute: ActivatedRoute,
    private customerService:CustomerService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
  
	
   
  ) { }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.reloadData();
   
    }

	pay(){
		const ModalRef = this.modalService.open(PayComponent);
		ModalRef.componentInstance.id = this.id;
		ModalRef.componentInstance.customerpayEventEmitter.subscribe(data=>{
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
		this.customerService.customerDebt(this.id).subscribe((data:any) => {
		
             if(data != null && data != [])
            {
			this.totalDebt = data.total.debt;
			this.totalPaid = data.total.paid;
			
				console.log('debt data',data);
				this.rows = data.payments;
				this.tempRows = this.rows;
				// for specific columns to be search instead of all you can list them by name
				this.columnsWithSearch = Object.keys(this.rows[0]);
				this.cdref.detectChanges();

			}
	
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
