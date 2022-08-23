import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeInfoComponent} from '../home-info/home-info.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'app/template/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteHomeinfoComponent } from './delete-homeinfo/delete-homeinfo.component';
import { AddHomeinfoComponent } from './add-homeinfo/add-homeinfo.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeInfoComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [HomeInfoComponent, DeleteHomeinfoComponent, AddHomeinfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PipeModule,
    NgxDatatableModule,
    CustomFormsModule,
    NgSelectModule,
    TagInputModule,
    NgxSpinnerModule,
    SharedModule,
    ArchwizardModule,
    NgbModule
  ]
})
export class HomeInfoModule { }
