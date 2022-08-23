import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import {TaqninDocumentComponent} from './document.component';
import {CreateTaqninDocumentComponent} from './components/create-document/create-document.component';
import { DocumentViewDetailsComponent } from './components/document-view-details/document-view-details.component';
import { ApproveDocumentComponent } from './components/document-view-details/approve-document/approve-document.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DocumentCommentComponent } from './components/document-view-details/document-comment/document-comment.component';
import { DocumentDeleteComponent } from './components/document-view-details/document-delete/document-delete.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentCommentDeleteComponent } from './components/document-view-details/document-comment-delete/document-comment-delete.component';
import { DocumentCommentEditComponent } from './components/document-view-details/document-comment-edit/document-comment-edit.component';
import { DocumentEditComponent } from './components/document-view-details/document-edit/document-edit.component';
export const routes: Routes = [
  {
    path: '',
    component: TaqninDocumentComponent,
    pathMatch: 'full'
  },
  {
    path:'add',
    component: CreateTaqninDocumentComponent
  },
  {
    path:'view/:id',
    component: DocumentViewDetailsComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgxDatatableModule,
    PipeModule,
    TranslateModule,
    FormsModule,
    ImageCropperModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ArchwizardModule,
    CustomFormsModule,
    NgSelectModule,
    SharedModule,
    TagInputModule,
    UiSwitchModule,
    PdfViewerModule,
  ],
  declarations: [
    TaqninDocumentComponent,
    CreateTaqninDocumentComponent,
    DocumentViewDetailsComponent,
    ApproveDocumentComponent,
    DocumentCommentComponent,
    DocumentDeleteComponent,
    DocumentCommentDeleteComponent,
    DocumentCommentEditComponent,
    DocumentEditComponent,
  ],
  providers: [
    NgbActiveModal
  ]
})
export class TaqninDocumentModule { }
