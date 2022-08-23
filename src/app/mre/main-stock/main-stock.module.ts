import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainStockComponent} from './main-stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';

import { TagInputModule } from 'ngx-chips';
import { DetailsComponent } from './details/details.component';
import { MoveSubStockComponent } from './move-sub-stock/move-sub-stock.component';
import { MoveOnSaleComponent } from './move-on-sale/move-on-sale.component';


export const routes: Routes = [
  {
    path: '',
    component: MainStockComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'moveSub',
    component: MoveSubStockComponent,
  },
  {
    path: 'moveOnSale',
    component: MoveOnSaleComponent,
  },
];
@NgModule({
  declarations: [MainStockComponent, DetailsComponent, MoveSubStockComponent, MoveOnSaleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    TranslateModule,
    CustomFormsModule,
    NgSelectModule,
    TagInputModule,
    NgxSpinnerModule,
    ArchwizardModule,
    NgbModule
  ]
})
export class MainStockModule { }
