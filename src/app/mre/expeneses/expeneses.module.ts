import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpenesesComponent } from './expeneses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'app/template/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExpenesesAddComponent } from './expeneses-add/expeneses-add.component';

import { DailyExpenesesComponent } from './daily-expeneses/daily-expeneses.component';
import { AddDailyExpensesComponent } from './daily-expeneses/add-daily-expenses/add-daily-expenses.component';
import { MonthlyExpensesComponent } from './monthly-expenses/monthly-expenses.component';
import { DeleteDailyExpenesesComponent } from './daily-expeneses/delete-daily-expeneses/delete-daily-expeneses.component';
import { DeleteExpenesesComponent } from './delete-expeneses/delete-expeneses.component';

export const routes: Routes = [
  {
    path: '',
    component:ExpenesesComponent ,
    pathMatch: 'full'
  },

  {
    path:'details/:id',
    component: DailyExpenesesComponent
  },

];


@NgModule({
  declarations: [ExpenesesComponent, ExpenesesAddComponent, DailyExpenesesComponent, AddDailyExpensesComponent, MonthlyExpensesComponent, DeleteDailyExpenesesComponent, DeleteExpenesesComponent],
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
export class ExpenesesModule { }
