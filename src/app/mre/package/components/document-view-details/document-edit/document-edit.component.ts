import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../../document.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-document-edit',
	templateUrl: './document-edit.component.html',
	styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
	@Input() data;
	@Output() documentEditEventEmitter = new EventEmitter<Object>();
	editForm: FormGroup;
	addFormSubmitted = false;
	attachmentFile: any;
	orgs;
	doctypes;
  documentId;
  fileName;
  types = ['data','voice','combo','sms'];
	constructor(
		public translate: TranslateService,
		private formBuilder: FormBuilder,
		private documentService: DocumentService,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private activeModal: NgbActiveModal,
    private router: Router,
	) { }

	ngOnInit(): void {
		this.buildForm();
	}

	buildForm() {
    console.log("Documeent: ", this.data);
		this.documentId = this.data.id;
		this.editForm = this.formBuilder.group({
			code: [this.data.code, [Validators.required]],
			sub_code: [this.data.sub_code, [Validators.required]],
			type: [this.data.type, [Validators.required]],
			validity: [this.data.validity,[Validators.required]],
			price: [this.data.price,[Validators.required]],
			amount: [this.data.amount, [Validators.required]],
			amount_value: [this.data.amount_value, [Validators.required]],
			name_en:[this.data.name_en, [Validators.required]],
			name_fa:[this.data.name_fa, [Validators.required]],
			name_ps:[this.data.name_ps, [Validators.required]],
			details_en:[this.data.details_en, [Validators.required]],
			details_fa:[this.data.details_fa, [Validators.required]],
			details_ps:[this.data.details_ps, [Validators.required]],
		});
    this.fileName = this.data.fileName;
	}

	fileChangeListener(event) {
		if (event != null) {
			if (event.target.files && event.target.files[0]) {
				this.attachmentFile = event.target.files[0];
				document.getElementById('fileName').innerHTML = event.target.files[0].name;
			}
		}
		else {
			document.getElementById('fileName').innerHTML = null;
		}
	}

	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			// const formData = new FormData();
			// // formData.append('avatar', this.attachmentFile);
			// formData.append('data', JSON.stringify(this.editForm.value));
			
			const {code, sub_code,type, validity, price, amount, amount_value, name_en, name_fa, name_ps, details_en, details_fa, details_ps} = this.editForm.value;
			this.documentService.editRecord(this.documentId,{code, sub_code,type, validity, price, amount, amount_value, name_en, name_fa, name_ps, details_en, details_fa, details_ps}).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
					this.activeModal.close();
					this.documentEditEventEmitter.emit(response);
        //   this.router.navigate(['documents']);
				} else {
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
					console.log(response);
				}
				this.spinner.hide();
			}, (error) => {
				this.spinner.hide();
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
			});
		}

	}
	closeModal() {
		this.activeModal.close();
	}

}
