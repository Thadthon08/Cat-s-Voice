import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { AboutComponent } from './page/about/about.component';
import { HomeComponent } from './page/home/home.component';
import { CardModule } from 'primeng/card';
import { AdminLoginComponent } from './adminPage/components/admin-login/admin-login.component';
import { MenubarComponent } from './adminPage/components/menubar/menubar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { NavbarComponent } from './page/components/navbar/navbar.component';
import { FindHomeComponentU } from './page/find-home/find-home.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FindhomeComponent } from './adminPage/components/findhome/findhome.component';
import { LayoutComponent } from './adminPage/components/layout/layout.component';
import { AddDataComponent } from './adminPage/components/add-data/add-data.component';
import { AnimalCardComponent } from './adminPage/components/animal-card/animal-card.component';
import { RecoveryComponent } from './adminPage/components/recovery/recovery.component';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AnimalManagementComponent } from './adminPage/components/animal-management/animal-management.component';
import { BannerComponent } from './page/components/banner/banner.component';
import { BoxSaerchComponent } from './page/components/box-saerch/box-saerch.component';
import { CardInSaerchComponent } from './page/components/card-in-saerch/card-in-saerch.component';
import { HeaderContentSearchComponent } from './page/components/header-content-search/header-content-search.component';
import { FindHomeService } from './services/find-home.service';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdminLoginComponent,
    MenubarComponent,
    NavbarComponent,
    FindHomeComponentU,
    FindhomeComponent,
    LayoutComponent,
    AddDataComponent,
    AnimalCardComponent,
    RecoveryComponent,
    AnimalManagementComponent,
    BannerComponent,
    BoxSaerchComponent,
    CardInSaerchComponent,
    HeaderContentSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule, 
    InputTextModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    FileUploadModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [provideClientHydration(), MessageService , FindHomeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
