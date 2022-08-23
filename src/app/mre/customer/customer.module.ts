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
import { CustomerComponent } from './customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { DetailsComponent } from './details/details.component';
import { PayDebtComponent } from './pay-debt/pay-debt.component';
import { DebtComponent } from './debt/debt.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { DebtDetailsComponent } from './debt-details/debt-details.component';
import { PayComponent } from './pay/pay.component';


export const routes:Routes = [
{
path: '',
component:CustomerComponent,
pathMatch: 'full'
},
{
  path:'customer/create',
  component: CreateCustomerComponent
},
{
  path:'details/:id',
  component: DetailsComponent
},
{
  path:'debt/:id',
  component: PayDebtComponent
},
{
  path:'debtDetails/:sale_id',
  component: DebtDetailsComponent
},
];


@NgModule({
  declarations: [CustomerComponent, CreateCustomerComponent, DetailsComponent, PayDebtComponent, DebtComponent, EditCustomerComponent, DebtDetailsComponent, PayComponent],
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
    NgbModule
  ]
})
export class CustomerModule { }
