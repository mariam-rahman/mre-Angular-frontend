import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnSaleComponent} from './on-sale.component';
import { RouterModule, Routes } from '@angular/router';
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
export const routes: Routes = [
  {
    path: '',
    component: OnSaleComponent,
    pathMatch: 'full'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  // {
  //   path: 'moveSub',
  //   component: MoveSubStockComponent,
  // },
];

@NgModule({
  declarations: [OnSaleComponent, DetailsComponent],
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
export class OnSaleModule { }
