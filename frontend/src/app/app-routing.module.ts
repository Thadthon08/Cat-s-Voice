import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { adminGuard } from './admin.guard';
import { AdminLoginComponent } from './adminPage/components/admin-login/admin-login.component';
import { MenubarComponent } from './adminPage/components/menubar/menubar.component';
import { loginGuard } from './login.guard';
import { FindhomeComponent } from './adminPage/components/findhome/findhome.component';
import { LayoutComponent as AdminLayoutComponent } from './adminPage/components/layout/layout.component';
import { AddDataComponent } from './adminPage/components/add-data/add-data.component';
import { RecoveryComponent } from './adminPage/components/recovery/recovery.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'findhome',
        component: FindhomeComponent,
      },
      {
        path: 'add-data',
        component: AddDataComponent,
      },
      {
        path: 'recovering',
        component: RecoveryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
