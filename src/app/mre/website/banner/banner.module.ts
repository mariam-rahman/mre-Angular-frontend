import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BannerComponent} from './banner.component'
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
import { BannerAddComponent } from './banner-add/banner-add.component';
import { BannerDeleteComponent } from './banner-delete/banner-delete.component';
import { BannerUpdateComponent } from './banner-update/banner-update.component';

export const routes: Routes = [
  {
    path: '',
    component: BannerComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [BannerComponent, BannerAddComponent, BannerDeleteComponent, BannerUpdateComponent],
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
export class BannerModule { }
