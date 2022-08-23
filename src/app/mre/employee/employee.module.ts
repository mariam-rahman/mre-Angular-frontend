import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
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
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { SalaryComponent } from './salary/salary.component';
import { PaySalaryComponent } from './pay-salary/pay-salary.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    pathMatch: 'full'
  },

  {
    path:'show/:id',
    component: ProfileEmployeeComponent
  },
  {
    path:'salary/:id',
    component: SalaryComponent
  },
  {
    path:'promotion/add',
    component: AddPromotionComponent
  },
  {
    path:'promotion/edit',
    component: EditPromotionComponent
  },
  {
    path:'employee/edit',
    component: EditEmployeeComponent
  },
];


@NgModule({
  declarations: [EmployeeComponent, CreateEmployeeComponent, ProfileEmployeeComponent, AddPromotionComponent, EditPromotionComponent, DeleteEmployeeComponent, EditEmployeeComponent, SalaryComponent, PaySalaryComponent],
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
export class EmployeeModule { }
