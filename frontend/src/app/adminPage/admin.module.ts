import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Import all components
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { FindhomeComponent } from './components/findhome/findhome.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AddDataComponent } from './components/add-data/add-data.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { AnimalManagementComponent } from './components/animal-management/animal-management.component';
import { EditAnimalComponent } from './components/edit-animal/edit-animal.component';
import { RecoveryManagementComponent } from './components/recovery-management/recovery-management.component';
import { EditRecoveryComponent } from './components/edit-recovery/edit-recovery.component';
import { RecoveryAddDataComponent } from './components/recovery-add-data/recovery-add-data.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { AdoptionManagementComponent } from './components/adoption-management/adoption-management.component';
import { ActivityAddDataComponent } from './components/add-data-activity/add-data-activity.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { ActivityManagementComponent } from './components/activity-management/activity-management.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: FindhomeComponent },
      { path: 'findhome/add-data', component: AddDataComponent },
      { path: 'findhome/edit-data/:id', component: EditAnimalComponent },
      { path: 'findhome/:id', component: AnimalManagementComponent },
      { path: 'findhome', component: FindhomeComponent },
      { path: 'recovering', component: RecoveryComponent },
      { path: 'recovering/add-data', component: RecoveryAddDataComponent },
      { path: 'recovering/:id', component: RecoveryManagementComponent },
      { path: 'recovering/edit/:id', component: EditRecoveryComponent },
      { path: 'adoption', component: AdoptionComponent },
      { path: 'even', component: ActivityComponent },
      { path: 'adoption/:id', component: AdoptionManagementComponent },
      { path: 'even/add-data', component: ActivityAddDataComponent },
      { path: 'even/:id', component: ActivityManagementComponent },
      
      
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
})
export class AdminModule {}
