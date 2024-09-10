import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { adminGuard } from './admin.guard';
import { AdminLoginComponent } from './adminPage/components/admin-login/admin-login.component';
import { MenubarComponent } from './adminPage/components/menubar/menubar.component';
import { loginGuard } from './login.guard';
import { FindHomeComponentU } from './page/find-home/find-home.component';
import { FindhomeComponent } from './adminPage/components/findhome/findhome.component';
import { LayoutComponent as AdminLayoutComponent } from './adminPage/components/layout/layout.component';
import { AddDataComponent } from './adminPage/components/add-data/add-data.component';
import { RecoveryComponent } from './adminPage/components/recovery/recovery.component';
import { AnimalManagementComponent } from './adminPage/components/animal-management/animal-management.component';
import { ShowAnimalDetailsComponent } from './page/show-animal-details/show-animal-details.component';
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
      { path: 'find_home', component: FindHomeComponentU },
      { path: 'find_home/:id', component: ShowAnimalDetailsComponent },
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
        path: 'findhome/:id',
        component: AnimalManagementComponent,
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
