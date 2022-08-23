import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../../document.service';
import { ApproveDocumentComponent } from './approve-document/approve-document.component';
import { DocumentCommentDeleteComponent } from './document-comment-delete/document-comment-delete.component';
import { DocumentCommentEditComponent } from './document-comment-edit/document-comment-edit.component';
import { DocumentCommentComponent } from './document-comment/document-comment.component';
import {DocumentEditComponent} from './document-edit/document-edit.component'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-document-view-details',
  templateUrl: './document-view-details.component.html',
  styleUrls: ['./document-view-details.component.scss']
})
export class DocumentViewDetailsComponent implements OnInit {
  documentId;
  document;
  comments;

  activeTab = "document";
	loading = true;
    files: any;

  constructor(
    public translate: TranslateService,
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.documentId = id;
      this.fetchDocumentData(this.documentId);
      this.getChildList(this.documentId);


    });

    

  }

  fetchDocumentData(documentId) {
    this.spinner.show();
    this.documentService.getRecordById(documentId).subscribe((response: any) => {
      this.document = response;
   
     
       this.spinner.hide();
    }, (error) => {
      console.log('Error: ', error);
      this.spinner.hide();
    });
  }
  approveDocument() {
    const modalRef = this.modalService.open(ApproveDocumentComponent);
    modalRef.componentInstance.id = this.documentId;
    modalRef.componentInstance.auto_renewal = this.document.auto_renewal
    modalRef.componentInstance.isList = this.document.isList;
    modalRef.componentInstance.active = this.document.active;
    modalRef.componentInstance.approveDocumentEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    })
  }



  //Child
  addChild() {
    const modalRef = this.modalService.open(DocumentCommentComponent,{ size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.data = this.documentId;
    modalRef.componentInstance.documentCommentEventEmitter.subscribe(() => {
      this.getChildList(this.documentId);
    });
  }

  deleteChild(childId) {
    const modalRef = this.modalService.open(DocumentCommentDeleteComponent);
    modalRef.componentInstance.data = childId;
    modalRef.componentInstance.documentCommentDeleteEventEmitter.subscribe(() => {
      this.getChildList(this.documentId);
    });
  }

  editChild(docId) {
    this.documentService.getRecordById(docId).subscribe((data)=>{
      const modalRef = this.modalService.open(DocumentCommentEditComponent, { size: 'lg', backdrop: 'static'});
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.documentId = this.documentId;
      modalRef.componentInstance.documentCommentEditEventEmitter.subscribe(() => {
        this.getChildList(this.documentId);
      });
    })

  }
  getChildList(documentId) {
     this.spinner.show();
    this.documentService.getChildList(documentId).subscribe((response: any) => {
       this.spinner.hide();
      this.comments = response.data;
     console.log('child list',response);
      
    });
  }
//end


editDocument() {
  this.documentService.getRecordById(this.documentId).subscribe((data)=>{
    const modalRef = this.modalService.open(DocumentEditComponent, {size: "xl"});
    modalRef.componentInstance.data = data;
    modalRef.componentInstance.documentEditEventEmitter.subscribe(() => {
      this.fetchDocumentData(this.documentId);
    });
  });

}

goToDocumentList(){
  this.router.navigate(['packages']);
}



  // downloadAttachement(id){ //document Id
  //   this.documentService.downloadAttachment(id).subscribe((data)=>{
  //     this.files = data;
  //     console.log("files",this.files[0]);
      
  //   })
  // }


}
