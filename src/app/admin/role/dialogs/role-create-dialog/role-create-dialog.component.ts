import { Component, OnInit, Output, Input, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { RoleService } from '../../role.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Role } from '../../role';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { ViewEncapsulation } from '@angular/core';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
// declare var $: any;

@Component({
	selector: 'role-create-dialog',
	templateUrl: './role-create-dialog.component.html',
	styleUrls: ['./role-create-dialog.component.scss']
})

export class RoleCreateDialogComponent implements OnInit {
	@Output() roleCreateEventEmitter = new EventEmitter<Object>();
	@Input() data;
	newForm: FormGroup;
	selectedpermissionId
	constructor(
			private roleService: RoleService, 
			private formBuilder: FormBuilder, 
			private translate: TranslateService,
			private activeModal: NgbActiveModal,
			private spinner: NgxSpinnerService,
			private translatedToastr: TranslatedToastrService,
			) { }

	ngOnInit() {
		this.newForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			permissions:['',[Validators.required]],
		});
	 }

	onFormSubmit() {
		if (this.newForm.valid) {
			this.spinner.show();
			const { name, permissions } = this.newForm.value;
			// extract selected permissions

			this.roleService.createRole({name, permissions}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
        		this.spinner.hide();
        		this.activeModal.close();
				this.roleCreateEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
        		console.log(error);
			});
		}
	  
		if (this.newForm.invalid) {
		// To display errors below forms
		Object.keys(this.newForm.controls).forEach(field => {
			const control = this.newForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
	}

	closeModal() {
		this.activeModal.close();
	}

}
