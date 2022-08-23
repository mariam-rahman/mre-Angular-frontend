import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/mre/package/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-comment-edit',
  templateUrl: './document-comment-edit.component.html',
  styleUrls: ['./document-comment-edit.component.scss']
})
export class DocumentCommentEditComponent implements OnInit {
  @Output() documentCommentEditEventEmitter = new EventEmitter<Object>();
  @Input() data;
  @Input() documentId;
editForm;
types = ['data','voice','combo','sms'];
  constructor(
    private formBuilder: FormBuilder,
		private activeModal: NgbActiveModal,
		private spinner: NgxSpinnerService,
		private translatedToastr: TranslatedToastrService,
		private documentService: DocumentService,
		public translate: TranslateService
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

	}

	onFormSubmit() {
		if (this.editForm.valid) {
			this.spinner.show();
			const {code, sub_code,type, validity, price, amount, amount_value, name_en, name_fa, name_ps, details_en, details_fa, details_ps} = this.editForm.value;
			this.documentService.editRecord(this.documentId,{code, sub_code,type, validity, price, amount, amount_value, name_en, name_fa, name_ps, details_en, details_fa, details_ps}).subscribe((response) => {
				if (response) {
					this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
					this.activeModal.close();
					this.documentCommentEditEventEmitter.emit(response);
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
