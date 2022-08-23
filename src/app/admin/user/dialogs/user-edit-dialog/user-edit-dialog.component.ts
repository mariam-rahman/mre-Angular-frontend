import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../user.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../user';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from 'app/_helpers/globals';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';


@Component({
	selector: 'user-edit-dialog',
	templateUrl: './user-edit-dialog.component.html',
	styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {
	@Output() userEditEventEmitter = new EventEmitter<Object>();

	@Input() data;
	isLoading = false;
	newUser: User;
	userEditForm: FormGroup;
	isAdmin$ = false;

	isSysAdmin;
	envs;


	constructor(
		public userService: UserService,
		private formBuilder: FormBuilder,
		private translate: TranslateService,
		public activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,

	) { }

	ngOnInit() {
	
    this.isAdmin$ = this.data.isAdmin;

    this.userEditForm = this.formBuilder.group({
			name: [this.data.name, [Validators.required]],
			username: [this.data.username, [Validators.required, Validators.minLength(3)]],
			phone_no: [this.data.phone_no, [Validators.required]],
			address: [this.data.address, [Validators.required]],
			email: [this.data.email, [Validators.required, Validators.email]],
			active: [this.data.active.toString()],
      isAdmin: [this.data.isAdmin, [Validators.required]],
		});

	}

	onEditFormSubmit() {
		//if (this.userEditForm.valid) {
			this.spinner.show();
        
            const { name, username, isAdmin, phone_no, address, email, active } = this.userEditForm.value;
			
			
			this.userService.updateUser(this.data.id, { name, username, isAdmin, phone_no, address, email, active})
			.subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
			    this.spinner.hide();
				this.activeModal.close();
			    this.userEditEventEmitter.emit(response);
			}, (error) => {
				this.spinner.hide();
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
			});
		//}

		if (this.userEditForm.invalid) {
		// To display errors below forms
		Object.keys(this.userEditForm.controls).forEach(field => {
			const control = this.userEditForm.get(field);
			control.markAsTouched({ onlySelf: true });
		});
		}
	}

	closeModal() {
		this.activeModal.close();
	}


  isUserAdmin(event){
    if(event){
      this.isAdmin$ = true;
      this.userEditForm.get('isAdmin').setValue(true);
    }
    else{
      this.isAdmin$ = true;
      this.userEditForm.get('isAdmin').setValue(false);
    }
  }

  }

