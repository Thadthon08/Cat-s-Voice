import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { AboutComponent } from './page/about/about.component';
import { adminGuard } from './admin.guard';
import { loginGuard } from './login.guard';
import { FindHomeComponentU } from './page/find-home/find-home.component';
import { ShowAnimalDetailsComponent } from './page/show-animal-details/show-animal-details.component';
import { AdopterComponent } from './page/adopter/adopter.component';
import { CaseTreatmentComponent } from './page/case-treatment/case-treatment.component';
import { AnimalsCaseTreatmentComponent } from './page/animals-case-treatment/animals-case-treatment.component';
import { DonateComponent } from './page/donate/donate.component';
import { AumrakComponent } from './page/aumrak/aumrak.component';
import { AumrakDetailsComponent } from './page/aumrak-details/aumrak-details.component';
import { SterilizationProgramComponent } from './page/sterilization-program/sterilization-program.component';
import { NewsComponent } from './page/news/news.component';
import { NewsDetailsComponent } from './page/news-details/news-details.component';
import { AdminLoginComponent } from './adminPage/components/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: '',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'find_home', component: FindHomeComponentU },
      { path: 'find_home/:id', component: ShowAnimalDetailsComponent },
      { path: 'adopter/:id', component: AdopterComponent },
      { path: 'case_treatment', component: CaseTreatmentComponent },
      { path: 'case_treatment/:id', component: AnimalsCaseTreatmentComponent },
      { path: 'donate', component: DonateComponent },
      { path: 'shelter', component: AumrakComponent },
      { path: 'shelter/:id', component: AumrakDetailsComponent },
      { path: 'spayed', component: SterilizationProgramComponent },
      { path: 'news', component: NewsComponent },
      { path: 'news/:id', component: NewsDetailsComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./adminPage/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // This is correct
  exports: [RouterModule], // Also correct
})
export class AppRoutingModule {}
