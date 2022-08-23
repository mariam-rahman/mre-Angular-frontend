import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


export const routes: Routes= [
  {
    path:'',
    component:ProductComponent,
    pathMatch:'full',
  }
]

@NgModule({
  declarations: [ProductComponent],
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
    NgbModule,
  
  ]
})
export class ProductModule { }
