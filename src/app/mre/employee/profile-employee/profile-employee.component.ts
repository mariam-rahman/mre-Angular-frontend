import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, DatatableComponent, SelectionType, SortType } from '@swimlane/ngx-datatable';
import { DatatablesService } from 'app/_services/datatables.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AddPromotionComponent } from '../add-promotion/add-promotion.component';
import { EditPromotionComponent } from '../edit-promotion/edit-promotion.component';

@Component({ 
  selector: 'app-profile-employee',
  templateUrl: './profile-employee.component.html',
  styleUrls: ['./profile-employee.component.scss']
})
export class ProfileEmployeeComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;
	SortType = SortType;

	rows;
	tempRows = [];
	columnsWithSearch = [];
	loading;
	data;
	id;
  empDetails;
  salary;

  
  constructor(
    private emplyeeService:EmployeeService,
    private cdref: ChangeDetectorRef,
		private datatables: DatatablesService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private spinner: NgxSpinnerService,
		private toaster: TranslatedToastrService,
    private activatedRoute:ActivatedRoute, 
    ) { }


ngOnInit() {
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.employeeDetails();
 this.reloadData();
 
  
}



refresh() {
  this.reloadData();
}


employeeDetails(){
  this.emplyeeService.showEmployee(this.id).subscribe((data:any)=>{
    console.log('all data',data);
  this.empDetails = data;
 
  }) 
}

reloadData() {
  // this.result = [];
  this.loading = true;
  this.spinner.show();
  this.emplyeeService.promotion(this.id).subscribe((data:any) => {
    console.log("promition",data);
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





addPromotion(){
  const modalRef = this.modalService.open(AddPromotionComponent);
  modalRef.componentInstance.id = this.id;
  modalRef.componentInstance.promotionCreateEventEmitter.subscribe(res =>{
    this.reloadData();
  })
}

editPromotion(id){
	this.spinner.show();
		this.emplyeeService.editPromotion(id).subscribe(res => {
			const modalRef = this.modalService.open(EditPromotionComponent);
			modalRef.componentInstance.data = res;
			this.spinner.hide();
			modalRef.componentInstance.promotionEditEventEmitter.subscribe((res) => {
				this.reloadData();
			});
		},(error)=>{
			this.spinner.hide(); 
		});
	}
}



