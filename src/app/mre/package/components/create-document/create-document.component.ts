import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';


@Component({
	selector: 'app-create-taqnin-document',
	templateUrl: './create-document.component.html',
	styleUrls: ['./create-document.component.scss']
})
export class CreateTaqninDocumentComponent implements OnInit {
	newForm: FormGroup;
	addFormSubmitted = false;
	attachmentFile1: any;
	attachmentFile2: any;
	isAutoRenewal$ = false;
	isList$ = false;
	fileName;
types = ['data','voice','combo','sms'];



	constructor(
		public translate: TranslateService,
		private formBuilder: FormBuilder,
		private documentService: DocumentService,
		private router: Router,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
	) { }


	ngOnInit(): void {
		this.buildForm();
	}

	buildForm() {
		this.newForm = this.formBuilder.group({
			code: [null,[Validators.required]],
			sub_code: [null,[Validators.required]],
			type: [null,[Validators.required]],
			validity: [null,[Validators.required]],
			price: [null,[Validators.required]],
			amount: [null,[Validators.required]],
			amount_value: [null,[Validators.required]],
			name_en:[null,[Validators.required]],
			name_fa:[null,[Validators.required]],
			name_ps:[null,[Validators.required]],
			auto_renewal:[],
			isList:[],
			details_en:[null,[Validators.required]],
			details_fa:[null,[Validators.required]],
			details_ps:[null,[Validators.required]],
			data_gifting:[],
			data_sharing:[],
			top_purchase:[],

		})
	}

	goToDocumentRoute() {
		this.router.
			navigate(['packages']);
	}


	fileChangeListener1(event) {
	
		if (event != null) {
			if (event.target.files && event.target.files[0]) {
				this.attachmentFile1 = event.target.files[0];
			}
		}
	
	}


	fileChangeListener2(files: FileList) {
		this.attachmentFile2 = files.item(0);
	}


	onFormSubmit() {
		if (this.newForm.valid) {
			this.spinner.show();
			const formData = new FormData();
			formData.append('avatar1', this.attachmentFile1);
			formData.append('avatar2', this.attachmentFile2);
			formData.append('data', JSON.stringify(this.newForm.value));
			this.documentService.addRecord(formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					console.log(response);
					this.goToDocumentRoute();
				} else {
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
					console.log(response);
				}
				this.spinner.hide();
			}, (error) => {
				this.spinner.hide();
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

	isAutoRenewal(event){
		console.log(event);
		
		  this.newForm.get('auto_renewal').setValue(event);
	  }

	  isList(event){
		  this.newForm.get('isList').setValue(event);
	  }

}
