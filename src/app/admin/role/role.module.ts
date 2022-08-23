import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RoleRoutes } from './role.routing';
// import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';

import { RoleComponent } from './role.component';
import { RoleCreateDialogComponent } from './dialogs/role-create-dialog/role-create-dialog.component';
import { RoleEditDialogComponent } from './dialogs/role-edit-dialog/role-edit-dialog.component';
import { RoleViewDialogComponent } from './dialogs/role-view-dialog/role-view-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoleDeleteComponent } from './dialogs/role-delete/role-delete.component';
import { CustomFormsModule } from 'ngx-custom-validators';
import { TagInputModule } from 'ngx-chips';
import { PipeModule } from 'app/template/shared/pipes/pipe.module';
import { SharedModule } from 'app/template/shared/shared.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RoleRoutes),
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
    UiSwitchModule,
  ],
  entryComponents: [
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    RoleViewDialogComponent
  ],
  declarations: [
    RoleComponent,
    RoleCreateDialogComponent,
    RoleEditDialogComponent,
    RoleViewDialogComponent,
    RoleDeleteComponent,
  ]
})
export class RoleModule { }
