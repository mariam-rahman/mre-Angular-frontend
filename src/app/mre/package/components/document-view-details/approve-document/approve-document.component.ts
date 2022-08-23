import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { DocumentService } from 'app/mre/package/document.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-approve-document',
  templateUrl: './approve-document.component.html',
  styleUrls: ['./approve-document.component.scss']
})
export class ApproveDocumentComponent implements OnInit {

  @Output() approveDocumentEventEmitter = new EventEmitter<Object>();
  @Input() id;
  @Input() auto_renewal;
  @Input() isList;
  @Input() active;
  loading = false;
  openFile = false;
  packageId;
  importForm: FormGroup;
   Id;
   AutoRenewal;
   IsList;
   Active;
  constructor(
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private documentService: DocumentService,
    private translatedToastr: TranslatedToastrService,
    public translate: TranslateService


  ) { }

  ngOnInit(): void {
   this.packageId = this.id;

  }

  closeModal() {
    this.activeModal.close();
  }

  changeApprove(event) {

    if (event) {
      this.active = 1;
    }
    else {
      this.active = 0;
    }
  }
  changeAutoRenewal(event) {

    if (event) {
      this.openFile = true;
      this.auto_renewal = 1;
    }
    else {
      this.openFile = false;
      this.auto_renewal = 0;
    }
  }
  changeIslist(event) {

    if (event) {
      this.openFile = true;
      this.isList = 1;
    }
    else {
      this.openFile = false;
      this.isList = 1;
    }
  }


  submit() {

			this.spinner.show();
      const isList = this.isList;
      const auto_renewal = this.auto_renewal;
      const active = this.active;
      const id = this.packageId;
			this.documentService.approveDocument({id, isList, auto_renewal, active}).subscribe((response) => {
				this.translatedToastr.success("SUCCESS", "RECORD_UPDATED_SUCCESSFULLY");
				this.spinner.hide();
				this.activeModal.close();
				this.approveDocumentEventEmitter.emit(response);
			}, (error) => {
				this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
				console.log(error);
				this.spinner.hide();
			})
		}
	

}
