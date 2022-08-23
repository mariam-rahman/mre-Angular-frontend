import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectLangPageComponent } from "./select-lang/select-lang-page.component";
import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { DevTeamComponent } from './dev-page/dev.component';
import { HomepageComponent } from './webpage/homepage/homepage.component';
import { ProductComponent } from './webpage/product/product.component';
import { AboutComponent } from './webpage/about/about.component';
import { HeaderComponent } from './webpage/header/header.component';
import { FooterComponent } from './webpage/footer/footer.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'select-lang',
        component: SelectLangPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },

      {
        path: 'dev-team',
        component: DevTeamComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },

      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
        }
      }
      ,
      {
        path: 'homepage',
        component: HomepageComponent,
        data: {
          title: 'homepage'
        }
      }
      ,
      {
        path: 'productpage',
        component: ProductComponent,
        data: {
          title: 'productpage'
        }
      }
      ,
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'about'
        }
      },
        {
        path: 'header',
        component: HeaderComponent,
        data: {
          title: 'header'
        }
      }
      ,
        {
        path: 'footer',
        component: FooterComponent,
        data: {
          title: 'footer'
        }
      }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule { }
