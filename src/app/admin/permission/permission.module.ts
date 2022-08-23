import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { PermissionRoutes } from './permission.routing';

import { PermissionComponent } from './permission.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DeletePermissionComponent } from './delete-permission/delete-permission.component';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'app/template/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePermissionComponent } from './create-permission/create-permission.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';

export const routes: Routes = [
  {
    path: '',
    component: PermissionComponent,
    pathMatch: 'full'
  },
  {
    path: 'delete',
    component: DeletePermissionComponent,
  },
  // {
  //   path: 'moveSub',
  //   component: MoveSubStockComponent,
  // },
];
@NgModule({
 
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
  ],
  declarations: [
    PermissionComponent,
    DeletePermissionComponent,
    CreatePermissionComponent,
    EditPermissionComponent,
    
  ]
})
export class PermissionModule { }
