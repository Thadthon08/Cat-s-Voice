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
import { InputTextModule } from 'primeng/inputtext';
import { FindhomeComponent } from './adminPage/components/findhome/findhome.component';
import { LayoutComponent } from './adminPage/components/layout/layout.component';
import { AddDataComponent } from './adminPage/components/add-data/add-data.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdminLoginComponent,
    MenubarComponent,
    FindhomeComponent,
    LayoutComponent,
    AddDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
