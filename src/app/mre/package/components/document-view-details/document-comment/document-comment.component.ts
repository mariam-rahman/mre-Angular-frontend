import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/mre/package/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-document-comment',
  templateUrl: './document-comment.component.html',
  styleUrls: ['./document-comment.component.scss']
})
export class DocumentCommentComponent implements OnInit {
  @Output() documentCommentEventEmitter = new EventEmitter<Object>();
  @Input() data;
	newForm: FormGroup;
	addFormSubmitted = false;
	attachmentFile: any;
	isAutoRenewal$ = false;
	isList$ = false;
  document_Id;
types = ['data','voice','combo','sms'];
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private translatedToastr: TranslatedToastrService,
    private service: DocumentService,
    public translate: TranslateService

  ) { }

  ngOnInit(): void {
    this.document_Id = this.data;
    this.buildForm()
  }

	buildForm() {
		this.newForm = this.formBuilder.group({
			code: [null, [Validators.required]],
			sub_code: [null, [Validators.required]],
			type: [null, [Validators.required]],
			validity: [null,[Validators.required]],
			price: [null,[Validators.required]],
			amount: [null, [Validators.required]],
			amount_value: [null, [Validators.required]],
			name_en:[null, [Validators.required]],
			name_fa:[null, [Validators.required]],
			name_ps:[null, [Validators.required]],
			details_en:[null, [Validators.required]],
			details_fa:[null, [Validators.required]],
			details_ps:[null, [Validators.required]],

		})
	}
	onFormSubmit() {
		if (this.newForm.valid) {
			this.spinner.show();
			const formData = new FormData();
            const parent_id = this.document_Id
			// const {code, sub_code,type, validity, price, amount, amount_value, name_en, name_fa, name_ps, details_en, details_fa, details_ps} = this.newForm.value;
          formData.append('data', JSON.stringify(this.newForm.value));
          formData.append('parentId', parent_id);
		
			this.service.addRecord(formData).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_CREATED_SUCCESSFULLY");
					this.closeModal();
					this.documentCommentEventEmitter.emit(response);
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
		else {
			
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
