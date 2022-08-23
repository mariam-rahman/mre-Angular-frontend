import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SubStockComponent} from './sub-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { SubstockDetailsComponent } from './substock-details/substock-details.component';
import { MoveOnSaleComponent } from './move-on-sale/move-on-sale.component';
import { RestoreComponent } from './restore/restore.component';

export const routes: Routes = [
  {
    path: '',
    component: SubStockComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: SubstockDetailsComponent,
  },
  {
    path: 'move/onsale/:id',
    component: SubstockDetailsComponent,
  },
  {
    path: 'substock/restore',
    component: SubstockDetailsComponent,
  },
];

@NgModule({
  declarations: [SubStockComponent, SubstockDetailsComponent, MoveOnSaleComponent, RestoreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    NgxDatatableModule,
    TranslateModule,
    CustomFormsModule,
    NgSelectModule,
    TagInputModule,
    ImageCropperModule,
    NgxSpinnerModule,
    SharedModule,
    ArchwizardModule,
    NgbModule
  ]
})
export class SubStockModule { }
