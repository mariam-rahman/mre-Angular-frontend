import { Routes } from '@angular/router';
import { DeletePermissionComponent } from './delete-permission/delete-permission.component';

import { PermissionComponent } from './permission.component';

export const PermissionRoutes: Routes = [
    {
        path: '',
        component: PermissionComponent,
        pathMatch:  'full'
    },
    {
        path: 'delete',
        component: DeletePermissionComponent,
      },
];
