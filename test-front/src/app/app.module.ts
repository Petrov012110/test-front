import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './company-yandex-map/company-yandex-map.component';
import { CompanyComponent } from './shared/components/company/company-item.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ResourseCompanyService } from './shared/services/resourse-company.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanySortComponent } from './shared/components/company-sort/company-sort.component';
import { CompanyFilterComponent } from './shared/components/company-filter/company-filter.component';
import { FilterService } from './shared/services/filter.service';
import { ManagerService } from './shared/services/maneger.service';

const components: any[] = [
  AppComponent,
  MainLayoutComponent,
  CompanyListComponent,
  CompanyDetailComponent,
  CompanyYandexMapComponent,
  CompanyComponent,
  NavigationComponent
];

const imports: any[] = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule
];

const providers: any[] = [
  ResourseCompanyService,
  FilterService,
  ManagerService,
];
@NgModule({
  declarations: [
    ...components,
    CompanySortComponent,
    CompanyFilterComponent
  ],
  imports: [
    ...imports
  ],
  providers: [
    ...providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
