import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/template/shared/shared.module';
import { TagInputModule } from 'ngx-chips';
import { SaleComponent } from './sale.component';
import { SellTOComponent } from './sell-to/sell-to.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DeleteSellProductComponent } from './delete-sell-product/delete-sell-product.component';
import { EditSellProductComponent } from './edit-sell-product/edit-sell-product.component';
import { SaleDeleteComponent } from './sale-delete/sale-delete.component';
import { SaleDetailsComponent } from './sale-details/sale-details.component';



export const routes:Routes = [
  {
  path: '',
  component:SaleComponent,
  pathMatch: 'full'
  },
 {
   path: 'invoice/:id',
   component:InvoiceComponent
 },
 {
  path: 'delete-sell-product',
  component:DeleteSellProductComponent
},
{
  path: 'sale/details/:sale_id',
  component:SaleDetailsComponent
},
  ];


@NgModule({
  declarations: [SaleComponent, SellTOComponent, InvoiceComponent, DeleteSellProductComponent, EditSellProductComponent, SaleDeleteComponent, SaleDetailsComponent],
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
    NgxSpinnerModule,
    SharedModule,
    ArchwizardModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ArchwizardModule,
    CustomFormsModule,
    NgbModule,
    NgSelectModule,
    TagInputModule
  ]
})
export class SaleModule { }
