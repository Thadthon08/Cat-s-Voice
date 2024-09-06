import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { adminGuard } from './admin.guard';
import { AdminLoginComponent } from './adminPage/components/admin-login/admin-login.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // หน้าแรก Home
  { path: 'about', component: AboutComponent, canActivate: [adminGuard] }, // เส้นทางสำหรับหน้า About ที่ถูกป้องกันด้วย Guard
  { path: 'admin/login', component: AdminLoginComponent }, // เส้นทางสำหรับหน้า Admin Login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
