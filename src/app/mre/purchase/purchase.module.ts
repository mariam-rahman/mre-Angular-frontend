import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseComponent} from './purchase.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
//import { SharedModule } from 'app/template/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { DeletePurchaseComponent } from './delete-purchase/delete-purchase.component';
import { EditPurchaseComponent } from './edit-purchase/edit-purchase.component';


export const routes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
    pathMatch: 'full'
  },
  {
    path: 'purchase/edit',
    component: EditPurchaseComponent,
    pathMatch: 'full'
  },
  

];


@NgModule({
  declarations: [PurchaseComponent, CreatePurchaseComponent, DeletePurchaseComponent, EditPurchaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    //PipeModule,
    NgxDatatableModule,
    TranslateModule,
    CustomFormsModule,
    NgSelectModule,
    TagInputModule,
    NgxSpinnerModule,
    //SharedModule,
    ArchwizardModule,
    NgbModule
  ]
})
export class PurchaseModule { }
