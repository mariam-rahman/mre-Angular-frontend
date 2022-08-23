import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
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
import { CreateProductComponent } from './create-product/create-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';


export const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'product/create',
    component: CreateProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'product/show',
    component: ShowProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'product/edit',
    component: ShowProductComponent,
    pathMatch: 'full'
  },
  {
    path: 'product/delete',
    component: ShowProductComponent,
    pathMatch: 'full'
  },

];
@NgModule({
  declarations: [ProductComponent,CreateProductComponent, ShowProductComponent, EditProductComponent, DeleteProductComponent],
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
export class ProductModule { }
