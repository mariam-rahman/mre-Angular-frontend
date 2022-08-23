import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from "./template/layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./template/layouts/content/content-layout.component";
import { Full_ROUTES } from "./template/shared/routes/full-layout.routes";
import { AuthGuard } from './template/shared/auth/auth-guard.service';
import { SummaryComponent } from './mre/summary/summary.component';
import { MainStockComponent } from './mre/main-stock/main-stock.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./mre/summary/taqnin-summary.module').then(m => m.TaqninSummaryModule)
      },
   
  
      {
        path: 'reports',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'stock/main',
        loadChildren: () => import('./mre/main-stock/main-stock.module').then(m=>m.MainStockModule)
      },
      {
        path: 'stock/sub',
        loadChildren: () => import('./mre/sub-stock/sub-stock.module').then(m=>m.SubStockModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./mre/category/category.module').then(m=>m.CategoryModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./mre/product/product.module').then(m=>m.ProductModule)
      },
      {
        path: 'purchase',
        loadChildren: () => import('./mre/purchase/purchase.module').then(m=>m.PurchaseModule)
      },

      
      {
        path: 'employees',
        loadChildren: () => import('./mre/employee/employee.module').then(m=>m.EmployeeModule)
      },
      //Routes for Shop
      {
        path: 'onsales',
        loadChildren: () => import('./mre/on-sale/on-sale.module').then(m=>m.OnSaleModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./mre/customer/customer.module').then(m=>m.CustomerModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('./mre/sale/sale.module').then(m=>m.SaleModule)
      },
      {
        path: 'expenses',
        loadChildren: () => import('./mre/expeneses/expeneses.module').then(m=>m.ExpenesesModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m =>m.AdminModule)
      },
      {
        path: 'banner',
        loadChildren: () => import('./mre/website/banner/banner.module').then(m =>m.BannerModule)
      },
      {
        path: 'webcategory',
        loadChildren: () => import('./mre/website/web-category/web-category.module').then(m =>m.WebCategoryModule)
      },
      {
        path: 'webproduct',
        loadChildren: () => import('./mre/website/web-product/webproduct/webproduct.module').then(m =>m.WebproductModule)
      },
      {
        path: 'homeinfo',
        loadChildren: () => import('./mre/website/home-info/home-info.module').then(m =>m.HomeInfoModule)
      },
      // {
      //   path: 'products',
      //   loadChildren: () => import('./public-pages/webpage/product/product.module').then(m =>m.ProductModule)
      // },
      

    // {
    //   path: 'configuration',
    //   loadChildren: () => import('./configuration/configuration.module').then(m =>m.ConfigurationModule)
    // },
    {
      path: 'editprofiles',
      loadChildren: () => import('./edit_profile_menu_bar/edit_profile_menu_bar.module').then(m=>m.EditProfileMenuBarModule)
    }

    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

 

  {
    path: '', component: ContentLayoutComponent,
    data: { title: 'content Views' },
    children: [
      {
      path: '',
      loadChildren: () => import('./public-pages/public-pages.module').then(m => m.PublicPagesModule)
    },
   
   
  ]
  },
  { path: 'template', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  // { path: 'template', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
