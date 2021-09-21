import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CompanyYandexMapComponent } from './company-yandex-map/company-yandex-map.component';
import { CompanyComponent } from './shared/components/company/company-item.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { ResourseCompanyService } from './shared/services/resourse-company.service';
import { CompanySortComponent } from './shared/components/company-sort/company-sort.component';
import { CompanyFilterComponent } from './shared/components/company-filter/company-filter.component';
import { FilterService } from './shared/services/filter.service';
import { ManagerService } from './shared/services/manager.service';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SortCompanyNamePipe } from './shared/pipes/sort-company.pipe';
import { SortIndustryPipe } from './shared/pipes/sort-industry.pipe';
import { SortTypePipe } from './shared/pipes/sort-type.pipe';
import { YandexMapService } from './shared/services/yandex-map.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { CacheService } from './shared/services/cache.service';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';


const components: any[] = [
  AppComponent,
  MainLayoutComponent,
  CompanyListComponent,
  CompanyDetailComponent,
  CompanyYandexMapComponent,
  CompanyComponent,
  NavigationComponent,
  SearchPipe,
  SortCompanyNamePipe,
  SortIndustryPipe,
  SortTypePipe,
  CompanySortComponent,
  CompanyFilterComponent
];

const imports: any[] = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  ScrollingModule
];

const providers: any[] = [
  ResourseCompanyService,
  FilterService,
  ManagerService,
  YandexMapService,
  LocalStorageService,
  CacheService,
  GlobalErrorHandlerService,
  { provide: ErrorHandler, useExisting: GlobalErrorHandlerService }
];
@NgModule({
  declarations: [
    ...components
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
